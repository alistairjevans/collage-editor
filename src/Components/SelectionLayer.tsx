import React, { FunctionComponent } from 'react';
import { ImageState } from './Image';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  selectionLayer: {
    position: "fixed",
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    pointerEvents: 'none'
  },
  selectionBorderSvg: {
    position: 'absolute',
    pointerEvents: 'none'   
  },
  selectionBorderPolygon: {
    fill: 'none',
    strokeWidth: '3px',
    stroke: 'blue',
    strokeLinejoin: 'round'
  },
});

const SelectionPolygon : FunctionComponent<{ selectedImage: ImageState }> = ({ selectedImage }) =>
{
    const classes = useStyles();

    return <svg className={classes.selectionBorderSvg} width={selectedImage.imageSize.width} height={selectedImage.imageSize.height} style={{
        left: selectedImage.boundingRect.left,
        top: selectedImage.boundingRect.top
    }}>
        <polygon className={classes.selectionBorderPolygon} points={selectedImage.borderPoints}></polygon>
    </svg>;
}

const SelectionLayer : FunctionComponent<{ selectedImage: ImageState | null }> = ({ selectedImage }) =>
{
    const classes = useStyles();

    const selectionPolygon = selectedImage ? <SelectionPolygon selectedImage={selectedImage} /> : null;

    return <div className={classes.selectionLayer}>
        {selectionPolygon}
    </div>;
}

export default SelectionLayer;