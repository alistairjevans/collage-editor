import React, { FunctionComponent, useState, useRef, MouseEventHandler } from 'react';
import { ImageState } from '../CommonTypes';
import { makeStyles, Theme } from '@material-ui/core/styles';
import SelectionRotator from './SelectionRotator';
import { Transform } from 'panzoom';
import Flatten from '@flatten-js/core';

interface InteractionLayerProps 
{
  selectedImage: ImageState | null,
  currentBoardTransform: Transform,
  onRotationChanged: (image: ImageState, rotateDegs: number) => void,
  onRotationEnded: (image: ImageState, rotateDegs: number) => void
}

interface StyleProps 
{
  isRotateActive: boolean
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  overlayLayer: props => ({
    position: "fixed",
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    pointerEvents: props.isRotateActive ? 'auto' : 'none',
    cursor: props.isRotateActive ? 'grabbing' : 'cursor'
  }),
}));

const InteractionLayer : FunctionComponent<InteractionLayerProps> = ({ selectedImage, currentBoardTransform, onRotationChanged, onRotationEnded }) =>
{
    const [isRotateActive, setRotateActive] = useState(false);    
    const startRotateDegrees = useRef(0);
    const lastRotateDegrees = useRef(0);
    const classes = useStyles({ isRotateActive });

    let rotator: React.ReactNode;
    let mouseMove : MouseEventHandler<HTMLDivElement> | undefined;
    let interactionEnd : MouseEventHandler<HTMLDivElement> | undefined;

    if (selectedImage)
    {
      var offsetBox = new Flatten.Box(
        selectedImage.boundingRect.left, 
        selectedImage.boundingRect.top,
        selectedImage.boundingRect.right,
        selectedImage.boundingRect.bottom);

      var point = Flatten.point(selectedImage.boundingRect.left + (selectedImage.imageSize.width / 2), selectedImage.boundingRect.top - 100);
      
      let radsAngle = selectedImage.rotate * Math.PI/180.;

      let rotatedPoint = point.rotate(radsAngle, offsetBox.center);

      var xOffset = currentBoardTransform.x + (rotatedPoint.x * currentBoardTransform.scale);
      var yOffset = currentBoardTransform.y + (rotatedPoint.y * currentBoardTransform.scale);
      
      var offsetCenter = { 
        x: currentBoardTransform.x + (offsetBox.center.x * currentBoardTransform.scale), 
        y: currentBoardTransform.y + (offsetBox.center.y * currentBoardTransform.scale)
      };

      const getDegrees = (x: number, y: number) => {        
        
        const radians	= Math.atan2(x - offsetCenter.x, y - offsetCenter.y);
        const degrees	= Math.round((radians * (180 / Math.PI) * -1) + 100);

        return degrees;
      }
  
      rotator = <SelectionRotator center={{ x: xOffset, y: yOffset }} onMouseDown={(ev) => { 

        startRotateDegrees.current = getDegrees(ev.pageX, ev.pageY) - selectedImage.rotate;
        lastRotateDegrees.current = 0;
        setRotateActive(true);

      }} />

      if (isRotateActive)
      {
        // Add a mousemove handler.
        mouseMove = (ev) => {
                    
          // Calculate the mouse move position, removing starting point
          const degrees = getDegrees(ev.pageX, ev.pageY) - startRotateDegrees.current;
          
          lastRotateDegrees.current = degrees;
          onRotationChanged(selectedImage, degrees);
        }
        
        interactionEnd = () => 
        {
            onRotationEnded(selectedImage, lastRotateDegrees.current);
  
            setRotateActive(false);          
        };
      }
    }

    return <div className={classes.overlayLayer} onMouseUp={interactionEnd} onMouseLeave={interactionEnd} onMouseMove={mouseMove}>
      {rotator}
    </div>;
}

export default InteractionLayer;