import React, { FunctionComponent, SVGProps } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles';
import LoopIcon from '@material-ui/icons/Loop';

interface SelectionRotatorProps extends SVGProps<SVGSVGElement> {
  center: { x: number, y: number }
}

const useStyles = makeStyles(({ palette } : Theme) => ({

  rotator: {
    position: 'absolute',
    cursor: 'grab',
    pointerEvents: 'all',
    touchAction: 'none'
  },

}));

const SelectionRotator : FunctionComponent<SelectionRotatorProps> = (props) =>
{
    const { center } = props;
    const classes = useStyles();

    return <svg className={classes.rotator} width={50} height={50} style={{
        left: center.x - 25,
        top: center.y - 25
    }} {...props}>
        <LoopIcon />
    </svg>;
}

export default SelectionRotator;
