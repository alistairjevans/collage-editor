import React, { FunctionComponent } from 'react';
import { ImageState } from '../CommonTypes';
import { makeStyles } from '@material-ui/core/styles';
import SelectionPolygon from './SelectionPolygon';

const useStyles = makeStyles(() => ({
  selectionLayer: {
    position: "fixed",
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    pointerEvents: 'none'
  }
}));

const SelectionLayer : FunctionComponent<{ hoverImage: ImageState | null, selectedImage: ImageState | null }> = ({ hoverImage, selectedImage }) =>
{
    const classes = useStyles();

    const selectionPolygon = selectedImage ? <SelectionPolygon color="primary" img={selectedImage} /> : null;

    const hoverPolygon = hoverImage && hoverImage.url !== selectedImage?.url ? <SelectionPolygon color="secondary" img={hoverImage} /> : null;

    return <div className={classes.selectionLayer}>
        {selectionPolygon}
        {hoverPolygon}
    </div>;
}

export default SelectionLayer;