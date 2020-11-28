import React, { useState, useRef, useEffect, useCallback } from 'react';
import Board, { BoardMethods } from './Components/Board';
import Image from './Components/Image';
import { ImageState, AvailableWorkshopImage, SavedWorkshopState } from './CommonTypes';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { loadWorkshop } from './WorkshopLoader';
import SelectionLayer from './Components/SelectionLayer';
import OptionBar from './OptionBar';
import InteractionLayer from './Components/InteractionLayer';
import { Transform } from 'panzoom';
import Flatten from '@flatten-js/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF66B2',
      light: '#FF007F'
    }
  }
})

const useStyles = makeStyles(theme => ({
  computeCanvas: {
    visibility: 'hidden',
    position: 'fixed',
    left: -9999
  },
  selectionLayer: {
    position: "fixed",
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    pointerEvents: 'none'
  }
}));

function App() {

  let workshop = "default";

  if (window.location.hash)
  {
    workshop = window.location.hash.substring(1) || "default";
  }

  const classes = useStyles();
  const processingCanvasEl = useRef<HTMLCanvasElement>(null);
  const boardMethods = useRef<BoardMethods>(null);
  const cachedImageStates = useRef<(ImageState | null)[]>();
  const [workshopName, setWorkshopName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [workshopImages, setWorkshopImages] = useState<AvailableWorkshopImage[]>([]);
  const [orderedImages, setOrderedImages] = useState<AvailableWorkshopImage[]>([]);
  const [workshopUrl] = useState(() => new URL(workshop + "/", window.location.href).href);
  const [boardMotionActive, setBoardMotionActive] = useState(true);
  const [hoverImageData, setHoverImageData] = useState<ImageState | null>(null);
  const [selectedImageData, setSelectedImageData] = useState<ImageState | null>(null);
  const [movingImageData, setMovingImageData] = useState<ImageState | null>(null);
  const [interactionTransform, setInteractionTransform] = useState<Transform>({ x: 0, y: 0, scale: 1.0 });

  const zoomToFit = () => {

    var cachedImages = cachedImageStates.current;

    let currentBox: Flatten.Box | null = null;
    let isFirst = true;

    for (let img of cachedImages || [])
    {
      if (img?.inUse)
      {
        let thisBox = img?.transformedPolygon.box;
        if (isFirst)
        {
          currentBox = thisBox;
          isFirst = false;
        }
        else 
        {
          let cloned: Flatten.Box = currentBox!.clone();

          if (thisBox.xmin < cloned.xmin)
          {
            cloned.xmin = thisBox.xmin;
          }

          if (thisBox.ymin < cloned.ymin)
          {
            cloned.ymin = thisBox.ymin;
          }

          if (thisBox.xmax > cloned.xmax)
          {
            cloned.xmax = thisBox.xmax;
          }

          if (thisBox.ymax > cloned.ymax)
          {
            cloned.ymax = thisBox.ymax;
          }

          currentBox = cloned;
        }
      }
    }

    if (currentBox)
    {
      boardMethods.current?.resetZoom(currentBox);
    }
    else 
    {      
      boardMethods.current?.resetZoom();
    }
  };

  useEffect(() => {    
    let callback = () => setTimeout(zoomToFit, 100);
    window.addEventListener("orientationchange", callback);

    return () => window.removeEventListener("orientationchange", callback);
  }, []);

  useEffect(() => {
    const workshopLoad = async () => {
      
      try {

        // Fixed for now.
        var workshopData = await loadWorkshop(workshopUrl);

        setWorkshopName(workshopData.name);

        // Look for any existing workshop data.
        var existingData = localStorage.getItem(`data_${workshopUrl}`);

        var loadedImages = workshopData.images.map(url => ({
          url,
          inUse: false,
          initialX: 0,
          initialY: 0,
          rotate: 0
        }));

        let orderedImages = loadedImages;
  
        if (existingData)
        {
          var parsedData = JSON.parse(existingData) as SavedWorkshopState;

          if (parsedData)
          {
            // Use our loaded images.
            setBackgroundColor(parsedData.backgroundColor);

            let savedImages = parsedData.images.map(cachedImg => ({
              inUse: cachedImg.inUse,
              url: cachedImg.url,
              initialX: cachedImg.x,
              initialY: cachedImg.y,
              rotate: cachedImg.rotate
            }));

            // Empty the ordered images set.
            orderedImages = [];

            // Make sure we have all the images.
            loadedImages.forEach(img => {
              const savedImg = savedImages.find(v => v.url === img.url);
              if (savedImg)
              {
                // Add the image.
                orderedImages.push(savedImg);
                img.inUse = savedImg.inUse;
              }
              else 
              {
                orderedImages.push({ url: img.url, inUse: false, initialX: 0, initialY: 0, rotate: 0 });
              }
            });
          }
        }

        setWorkshopImages(loadedImages);
        setOrderedImages(orderedImages);

        // Define a cached set of image states.
        cachedImageStates.current = orderedImages.map(img => ({ 
          url: img.url, 
          inUse: img.inUse, 
          rotate: img.rotate, 
          borderPoints: "", 
          rawPolygon: new Flatten.Polygon(), 
          transformedPolygon: new Flatten.Polygon(),
          boundingRect: { left: img.initialX, top: img.initialY, right: 0, bottom: 0 }, 
          imageSize: { width: 0, height: 0 } }));
      }
      catch(e)
      {
        // Display any errors.
        console.error(e);
      }
    }

    workshopLoad();
  }, [workshopUrl]);

  const saveState = useCallback(() =>
  {
    if (!workshopUrl || !cachedImageStates.current)
    {
      return;
    }

    // Save to local storage.
    const data : SavedWorkshopState = { 
      backgroundColor,
      images: cachedImageStates.current!.map((img) => ({ url: img!.url, inUse: img!.inUse, x: img!.boundingRect.left, y: img!.boundingRect.top, rotate: img!.rotate }))
    };

    localStorage.setItem(`data_${workshopUrl}`, JSON.stringify(data));
  }, [backgroundColor, workshopUrl]);

  useEffect(() => {

    saveState();
    
  }, [backgroundColor, orderedImages, workshopUrl, saveState]);

  const updateImageState = useCallback((state: ImageState) => {

    var imgData = cachedImageStates.current;
    
    if (!imgData)
    {
      return;
    }

    // Find the item in the array and update it.
    var idx = imgData.findIndex(img => img && img.url === state.url);

    var firstLoad = !imgData[idx]?.borderPoints;

    // Merge state, but keep the inUse flag.
    imgData[idx] = {...state, inUse: imgData[idx]!.inUse };

    // Do we need to do our first zoom?
    // If all in-use images have border points, we can zoom.
    if (firstLoad && imgData.findIndex(img => img?.inUse && !img.borderPoints) === -1)
    {
      // All in-use images loaded.
      zoomToFit();
    }

  }, []);

  const handleImageEnter = (state: ImageState) => {    
    setHoverImageData(state);
  }

  const handleImageLeave = (state: ImageState) => {
    setHoverImageData(null);
  }

  const handleMove = (state: ImageState) => {
    setMovingImageData(state);
  }

  const handleMoveEnd = (state: ImageState) => {
    setBoardMotionActive(true);
    setMovingImageData(null);

    if (hoverImageData && hoverImageData.url === state.url)
    {
      setHoverImageData(state);
    }

    if (selectedImageData && selectedImageData.url === state.url)
    {
      setSelectedImageData(state);
    }

    updateImageState(state);    

    saveState();
  }

  const handleSelect = (state: ImageState) => {
    setSelectedImageData(state);
  }

  const intersects = (r1: ImageState, r2: ImageState) =>
  { 
    var boolOp = Flatten.BooleanOperations;

    if (r1.transformedPolygon.box.not_intersect(r2.transformedPolygon.box))
    {
      return false;
    }

    if (r1.transformedPolygon.intersect(r2.transformedPolygon).length > 0)
    {
      return true;
    }

    var clip = boolOp.innerClip(r1.transformedPolygon, r2.transformedPolygon);

    if (clip[0].length > 0 || clip[1].length > 0)
    {
      return true;
    }

    return false;
  }

  const handleImageZOrderChange = (image: ImageState, newIdxFunc: (existingIdx: number, currentImageState: ImageState, allImages: (ImageState | null)[]) => number) => {

    var cachedImages = cachedImageStates.current;

    if (!cachedImages) {
      return;
    }

    // To move the image up one, we first find the position of the image in the array.
    // Then we walk up the array, find the next element with an overlapping bounding box.
    // If we don't find one, it goes at the top.
    var cacheItemIdx = cachedImages.findIndex(cImg => cImg?.url === image.url);

    if (cacheItemIdx === -1)
    {
      // Image is not in our cache? Not sure how that happens.
      return;
    }

    var cacheItem = cachedImages[cacheItemIdx]!;

    let moveToIdx = newIdxFunc(cacheItemIdx, cacheItem, cachedImages);
    
    if (moveToIdx === cacheItemIdx)
    {
      // Nothing to do.
      return;
    }

    // Remove the item from one location.
    cachedImages.splice(cacheItemIdx, 1);

    if (moveToIdx < cacheItemIdx)
    {
      moveToIdx++;
    }
    else 
    {
      moveToIdx--;
    }

    // Now put it back in another one.
    cachedImages.splice(moveToIdx, 0, cacheItem);

    // Now do the same thing for the image state list.
    let newState = [...orderedImages];
    var removed = newState.splice(cacheItemIdx, 1);
    newState.splice(moveToIdx, 0, removed[0]);

    setOrderedImages(newState);
  }

  const forwardZOrder = (existingIdx: number, currentImageState: ImageState, allImages: (ImageState | null)[]) => {
    
    // Go through the set, starting from the next element.
    for (let testItemIdx = existingIdx + 1; testItemIdx < allImages.length; testItemIdx++)
    {
      var testItem = allImages[testItemIdx];

      if(testItem && testItem.inUse && intersects(testItem, currentImageState))
      {
        return testItemIdx + 1;
      }
    }

    // Already at the top, nothing to do.
    return existingIdx;
  }
  
  const backZOrder = (existingIdx: number, currentImageState: ImageState, allImages: (ImageState | null)[]) => {
    
    // Go through the set, starting from the next element.
    for (let testItemIdx = existingIdx - 1; testItemIdx >= 0; testItemIdx--)
    {
      var testItem = allImages[testItemIdx];

      if(testItem && testItem.inUse && intersects(testItem, currentImageState))
      {
        return testItemIdx - 1;
      }
    }

    // Already at the bottom, nothing to do.
    return existingIdx;
  };

  const deleteAll = () => {
    setWorkshopImages(workshopImages.map(img => ({...img, inUse: false})));
    setOrderedImages(orderedImages.map(img => ({...img, inUse: false})));
    cachedImageStates.current!.forEach(state => { if(state) { state.inUse = false; } });
  };

  const toggleUseImage = (url: string, use: boolean) =>
  {
    var workshopItemIdx = workshopImages.findIndex(img => img.url === url);

    if (workshopItemIdx === -1)
    {
      return;
    }

    if (workshopImages[workshopItemIdx].inUse === use)
    {
      // Nothing to do.
      return;
    }

    var newImages = [...workshopImages];

    newImages[workshopItemIdx].inUse = use;

    setWorkshopImages(newImages);

    var newOrderedImages = [...orderedImages];

    var orderedIdx = orderedImages.findIndex(img => img.url === url);

    if (orderedIdx === -1)
    {
      // Not sure how this would ever happen?
      console.warn("Image in general list but not in ordered list.");
      return;
    }

    var item = newOrderedImages[orderedIdx];
    item.inUse = use;
    
    if (use)
    {
      newOrderedImages.splice(orderedIdx, 1);
      newOrderedImages.push(item);
    }

    setOrderedImages(newOrderedImages);

    // And finally update the cached image data.
    var imgStates = cachedImageStates.current!;
    var currentState = imgStates[orderedIdx];
    currentState!.inUse = use;

    if (use)
    {
      imgStates.splice(orderedIdx, 1);
      imgStates.push(currentState);

      // Zoom to fit the new image.
      zoomToFit();
    }
    else 
    {
      setSelectedImageData(null);
    }
  };  

  const rotationChanged = (selectedImage: ImageState, rotationDeg: number) => {

    var newState = { ...selectedImage, rotate: rotationDeg };

    updateImageState(newState);
    
    if (selectedImageData && selectedImageData.url === newState.url)
    {
      setSelectedImageData(newState);
    }

    // Update the image.
    let newOrderedImages = [...orderedImages];

    // Find the right index.
    var orderedIdx = newOrderedImages.findIndex(img => img.url === selectedImage.url);

    newOrderedImages[orderedIdx].rotate = rotationDeg;

    setOrderedImages(newOrderedImages);
  }

  const rotationEnded = (selectedImage: ImageState, rotationDeg: number) => {
    
    var newState = { ...selectedImage, rotate: rotationDeg };

    if (selectedImageData && selectedImageData.url === newState.url)
    {
      setSelectedImageData(newState);
    }

    updateImageState(newState);

    saveState();
  }

  const transformChanged = useCallback((transform: Transform) => {

    setInteractionTransform(transform);

  }, [setInteractionTransform]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">      
        <Board ref={boardMethods} backgroundColor={backgroundColor} motionActive={boardMotionActive} onTransformChanged={transformChanged} onBackgroundClicked={() => setSelectedImageData(null)}>
          {orderedImages.filter(img => img.inUse).map(img => 
            (<Image 
                canvas={processingCanvasEl.current!} 
                url={img.url}
                key={img.url}
                glued={false}
                initialX={img.initialX}
                initialY={img.initialY}
                rotate={img.rotate}
                dragScale={interactionTransform.scale}
                onInitialStateAvailable={updateImageState}
                onMovingStart={() => setBoardMotionActive(false)}
                onMove={handleMove}
                onMouseEnter={handleImageEnter}
                onMouseLeave={handleImageLeave}
                onMovingEnd={handleMoveEnd}
                onSelect={handleSelect} />) )}    
          <SelectionLayer hoverImage={hoverImageData} selectedImage={movingImageData ?? selectedImageData} key="_selection" />
        </Board>
        <InteractionLayer selectedImage={movingImageData ?? selectedImageData} currentBoardTransform={interactionTransform} onRotationChanged={rotationChanged} onRotationEnded={rotationEnded} />
        <OptionBar activeImage={selectedImageData}
                  boardBackgroundColor={backgroundColor}
                  workshopName={workshopName}
                  allImages={workshopImages}
                  onZoomToFit={() => zoomToFit()}
                  onUpOne={() => handleImageZOrderChange(selectedImageData!, forwardZOrder)}
                  onDownOne={() => handleImageZOrderChange(selectedImageData!, backZOrder)}
                  onRemoveImage={() => toggleUseImage(selectedImageData!.url, false)}
                  onUseImage={url => toggleUseImage(url, true)}
                  onBackgroundColorChange={color => setBackgroundColor(color)}    
                  onDeleteAll={deleteAll}
                  onHeadingClicked={() => setSelectedImageData(null)}
                  />
        <canvas ref={processingCanvasEl} className={classes.computeCanvas} />
      </div>  
    </ThemeProvider>
  );
}

export default App;
