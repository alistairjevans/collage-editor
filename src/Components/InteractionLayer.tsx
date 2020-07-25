import React, { FunctionComponent } from 'react';
import { ImageState } from '../CommonTypes';
import { makeStyles } from '@material-ui/core/styles';
import SelectionRotator from './SelectionRotator';
import { Transform } from 'panzoom';
import Flatten from '@flatten-js/core';

interface InteractionLayerProps 
{
  selectedImage: ImageState | null,
  currentBoardTransform: Transform,
}

const useStyles = makeStyles(() => ({
  overlayLayer: {
    position: "fixed",
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    pointerEvents: 'none'
  }
}));

const InteractionLayer : FunctionComponent<InteractionLayerProps> = ({ selectedImage, currentBoardTransform }) =>
{
    const classes = useStyles();

    let rotator: React.ReactNode | null;

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
  
      rotator = <SelectionRotator center={{ x: xOffset, y: yOffset }} />
    }

    return <div className={classes.overlayLayer}>
      {rotator}
    </div>;
}

export default InteractionLayer;