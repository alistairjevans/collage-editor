import React, { useState, useRef, useEffect } from 'react';
import Board from './Components/Board';
import Image from './Components/Image';
import { createUseStyles } from 'react-jss';
import { loadWorkshop, WorkshopDetails } from './WorkshopLoader';

const useStyles = createUseStyles({
  computeCanvas: {
    visibility: 'hidden',
    position: 'fixed',
    left: -9999
  }
});

function App() {

  const classes = useStyles();
  const processingCanvasEl = useRef<HTMLCanvasElement>(null);
  const [workshopUrl, setWorkshopUrl] = useState("http://localhost:3000/workshop/");
  const [workshopData, setWorkshopData] = useState<WorkshopDetails | null>(null);
  const [boardMotionActive, setBoardMotionActive] = useState(true);
  const [dragScale, setDragScale] = useState(1);

  useEffect(() => {
    const workshopLoad = async () => {
      
      try {

        // Fixed for now.
        var workshopData = await loadWorkshop(workshopUrl);

        setWorkshopData(workshopData);
      }
      catch(e)
      {
        // Display any errors.
        console.error(e);
      }
    }

    workshopLoad();
  }, [workshopUrl]);

  return (
    <div className="App">
      <Board active={boardMotionActive} onScaleChanged={scale => setDragScale(scale)}>
        {workshopData?.images.map(url => 
          (<Image 
              canvas={processingCanvasEl.current!} 
              url={url} 
              key={url} 
              dragScale={dragScale}
              onMovingStart={() => setBoardMotionActive(false)}
              onMovingEnd={() => setBoardMotionActive(true)} />) )}
      </Board>
      <canvas ref={processingCanvasEl} className={classes.computeCanvas} />
    </div>
  );
}

export default App;
