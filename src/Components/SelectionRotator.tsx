import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles';

interface SelectionRotatorProps {
  center: { x: number, y: number },
  distanceFromCenter: number,
  angle: number
}

const useStyles = makeStyles(({ palette } : Theme) => ({

  rotator: {
    position: 'absolute',
    pointerEvents: 'none'
  }

}));

const SelectionRotator : FunctionComponent<SelectionRotatorProps> = ({ center }) =>
{
    const classes = useStyles();

    return <svg className={classes.rotator} width={100} height={100} style={{
        left: center.x - 50,
        top: center.y - 50
    }}>
        <polygon></polygon>
    </svg>;
}

export default SelectionRotator;
