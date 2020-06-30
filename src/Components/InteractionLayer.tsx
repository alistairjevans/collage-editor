import React, { FunctionComponent } from 'react';
import { ImageState } from '../CommonTypes';
import { makeStyles } from '@material-ui/core/styles';
import SelectionRotator from './SelectionRotator';
import { Transform } from 'panzoom';

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
      const imageCenterX = selectedImage.boundingRect.left + (selectedImage.imageSize.width / 2);
      const imageCenterY = selectedImage.boundingRect.top + (selectedImage.imageSize.height / 2);

      var xOffset = currentBoardTransform.x + (imageCenterX * currentBoardTransform.scale);
      var yOffset = currentBoardTransform.y + (imageCenterY * currentBoardTransform.scale);
  
      rotator = <SelectionRotator center={{ x: xOffset, y: yOffset }} distanceFromCenter={1} angle={0} />
    }

    return <div className={classes.overlayLayer}>
      {rotator}
    </div>;
}

export default InteractionLayer;