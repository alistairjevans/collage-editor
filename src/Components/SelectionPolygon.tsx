import React, { FunctionComponent } from 'react';
import { ImageState } from '../CommonTypes';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles';

interface SelectionPolygonProps { img: ImageState, color: 'primary' | 'secondary' }

const useStyles = makeStyles(({ palette } : Theme) => ({
  selectionBorderSvg: {
    position: 'absolute',
    pointerEvents: 'none'   
  },
  selectionBorderPolygon: {
    fill: 'none',
    strokeWidth: '3px',
    strokeLinejoin: 'round',
    stroke: ({ color } : SelectionPolygonProps) => color === 'primary' ? palette.primary.main : palette.primary.light
  },
}));

const SelectionPolygon : FunctionComponent<SelectionPolygonProps> = ({ img, color }) =>
{
    const classes = useStyles({ img, color });

    return <svg className={classes.selectionBorderSvg} width={img.imageSize.width} height={img.imageSize.height} style={{
        left: img.boundingRect.left,
        top: img.boundingRect.top,
        transform: `rotate(${img.rotate}deg)`
    }}>
        <polygon className={classes.selectionBorderPolygon} points={img.borderPoints}></polygon>
    </svg>;
}

export default SelectionPolygon;
