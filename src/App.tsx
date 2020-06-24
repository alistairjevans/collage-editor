import React, { useState, useRef, useEffect } from 'react';
import Board from './Components/Board';
import Image, { ImageState } from './Components/Image';
import { createUseStyles } from 'react-jss';
import { loadWorkshop, WorkshopDetails } from './WorkshopLoader';
import SelectionLayer from './Components/SelectionLayer';

const useStyles = createUseStyles({
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
});

interface WorkshopImageState {
  url: string,
  lastState?: ImageState
}

function App() {

  const classes = useStyles();
  const processingCanvasEl = useRef<HTMLCanvasElement>(null);
  const [workshopName, setWorkshopName] = useState("");
  const [workshopImages, setWorkshopImages] = useState([] as WorkshopImageState[])
  const [workshopUrl, setWorkshopUrl] = useState("http://localhost:3000/workshop/");
  const [boardMotionActive, setBoardMotionActive] = useState(true);
  const [selectionImageData, setSelectionImageData] = useState<ImageState | null>(null);
  const [movingImageData, setMovingImageData] = useState<ImageState | null>(null);
  const [dragScale, setDragScale] = useState(1);

  useEffect(() => {
    const workshopLoad = async () => {
      
      try {

        // Fixed for now.
        var workshopData = await loadWorkshop(workshopUrl);

        setWorkshopName(workshopData.name);
        setWorkshopImages(workshopData.images.map<WorkshopImageState>(url => ({ url })));
      }
      catch(e)
      {
        // Display any errors.
        console.error(e);
      }
    }

    workshopLoad();
  }, [workshopUrl]);

  const handleImageEnter = (state: ImageState) => {    
    setSelectionImageData(state);
  }

  const handleImageLeave = (state: ImageState) => {
    setSelectionImageData(null);
  }

  const handleMove = (state: ImageState) => {
    setMovingImageData(state);
  }

  const handleMoveEnd = (state: ImageState) => {
    setBoardMotionActive(true);
    setMovingImageData(null);

    if (selectionImageData && selectionImageData.url === state.url)
    {
      setSelectionImageData(state);
    }
  }

  return (
    <div className="App">
      <Board active={boardMotionActive} onScaleChanged={scale => setDragScale(scale)}>
        {workshopImages.map(img => 
          (<Image 
              canvas={processingCanvasEl.current!} 
              url={img.url} 
              key={img.url} 
              dragScale={dragScale}
              onMovingStart={() => setBoardMotionActive(false)}
              onMove={handleMove}
              onMouseEnter={handleImageEnter}
              onMouseLeave={handleImageLeave}
              onMovingEnd={handleMoveEnd} />) )}
              
        <SelectionLayer selectedImage={movingImageData ?? selectionImageData} key="_selection" />
      </Board>
      <canvas ref={processingCanvasEl} className={classes.computeCanvas} />
    </div>
  );
}

export default App;
