import React, { useState, useRef, useEffect, useCallback } from 'react';
import Board, { BoardMethods } from './Components/Board';
import Image from './Components/Image';
import { ImageState, BoundingRect, AvailableWorkshopImage, SavedWorkshopState } from './CommonTypes';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { loadWorkshop } from './WorkshopLoader';
import SelectionLayer from './Components/SelectionLayer';
import { OptionBar } from './OptionBar';

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

  const classes = useStyles();
  const processingCanvasEl = useRef<HTMLCanvasElement>(null);
  const boardMethods = useRef<BoardMethods>(null);
  const cachedImageStates = useRef<(ImageState | null)[]>();
  const [workshopName, setWorkshopName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [workshopImages, setWorkshopImages] = useState<AvailableWorkshopImage[]>([]);
  const [orderedImages, setOrderedImages] = useState<AvailableWorkshopImage[]>([]);
  const [workshopUrl, setWorkshopUrl] = useState(() => new URL("/workshop/", window.location.href).href);
  const [boardMotionActive, setBoardMotionActive] = useState(true);
  const [hoverImageData, setHoverImageData] = useState<ImageState | null>(null);
  const [selectedImageData, setSelectedImageData] = useState<ImageState | null>(null);
  const [movingImageData, setMovingImageData] = useState<ImageState | null>(null);
  const [dragScale, setDragScale] = useState(1);

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
          initialY: 0
        }));

        let orderedImages = loadedImages;
  
        if (existingData)
        {
          var parsedData = JSON.parse(existingData) as SavedWorkshopState;

          if (parsedData)
          {
            // Use our loaded images.
            setBackgroundColor(parsedData.backgroundColor);

            orderedImages = parsedData.images.map(cachedImg => ({
              inUse: cachedImg.inUse,
              url: cachedImg.url,
              initialX: cachedImg.x,
              initialY: cachedImg.y
            }));

            parsedData.images.forEach(cachedImg => {
            
              if (cachedImg.inUse)
              {
                var loadedImg = loadedImages.find(img => img.url === cachedImg.url);
                if (loadedImg)
                {
                  loadedImg.inUse = true;
                }
              }

            });

            // Make sure we have all the images.
            workshopData.images.forEach(additionalUrl => {
              if (!orderedImages.find(v => v.url === additionalUrl))
              {
                // Add the image.
                orderedImages.push({ url: additionalUrl, inUse: false, initialX: 0, initialY: 0 });
              }
            });
          }
        }

        setWorkshopImages(loadedImages);
        setOrderedImages(orderedImages);

        // Define a cached set of image states.
        cachedImageStates.current = orderedImages.map(img => ({ url: img.url, inUse: img.inUse, borderPoints: "", boundingRect: { left: img.initialX, top: img.initialY, right: 0, bottom: 0 }, imageSize: { width: 0, height: 0 } }));
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
      images: cachedImageStates.current!.map((img) => ({ url: img!.url, inUse: img!.inUse, x: img!.boundingRect.left, y: img!.boundingRect.top }))
    };

    localStorage.setItem(`data_${workshopUrl}`, JSON.stringify(data));
  }, [backgroundColor, workshopUrl]);

  useEffect(() => {

    saveState();
    
  }, [backgroundColor, orderedImages, workshopUrl, saveState]);

  const updateImageState = (state: ImageState) => {

    var imgData = cachedImageStates.current;
    
    if (!imgData)
    {
      return;
    }

    // Find the item in the array and update it.
    var idx = imgData.findIndex(img => img && img.url === state.url);

    // Merge state, but keep the inUse flag.
    imgData[idx] = {...state, inUse: imgData[idx]!.inUse };
  }

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

  const intersects = (r1: BoundingRect, r2: BoundingRect) =>
  {
    return !(r2.left > r1.right || 
             r2.right < r1.left ||
             r2.top > r1.bottom || 
             r2.bottom < r1.top);
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

      if(testItem && testItem.inUse && intersects(testItem?.boundingRect, currentImageState.boundingRect))
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

      if(testItem && testItem.inUse && intersects(testItem?.boundingRect, currentImageState.boundingRect))
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
    }
    else 
    {
      setSelectedImageData(null);
    }
  };  

  return (
    <ThemeProvider theme={theme}>
      <div className="App">      
        <Board ref={boardMethods} backgroundColor={backgroundColor} motionActive={boardMotionActive} onScaleChanged={scale => setDragScale(scale)} onBackgroundClicked={() => setSelectedImageData(null)}>
          {orderedImages.filter(img => img.inUse).map(img => 
            (<Image 
                canvas={processingCanvasEl.current!} 
                url={img.url}
                key={img.url}
                initialX={img.initialX}
                initialY={img.initialY}
                dragScale={dragScale}
                onInitialStateAvailable={updateImageState}
                onMovingStart={() => setBoardMotionActive(false)}
                onMove={handleMove}
                onMouseEnter={handleImageEnter}
                onMouseLeave={handleImageLeave}
                onMovingEnd={handleMoveEnd}
                onSelect={handleSelect} />) )}              
          <SelectionLayer hoverImage={hoverImageData} selectedImage={movingImageData ?? selectedImageData} key="_selection" />
        </Board>
        <OptionBar activeImage={selectedImageData}
                  boardBackgroundColor={backgroundColor}
                  workshopName={workshopName}
                  allImages={workshopImages}
                  onZoomToFit={() => boardMethods.current?.resetZoom()}
                  onUpOne={() => handleImageZOrderChange(selectedImageData!, forwardZOrder)}
                  onDownOne={() => handleImageZOrderChange(selectedImageData!, backZOrder)}
                  onRemoveImage={() => toggleUseImage(selectedImageData!.url, false)}
                  onUseImage={url => toggleUseImage(url, true)}
                  onBackgroundColorChange={color => setBackgroundColor(color)}    
                  onDeleteAll={deleteAll}        
                  />
        <canvas ref={processingCanvasEl} className={classes.computeCanvas} />
      </div>  
    </ThemeProvider>
  );
}

export default App;
