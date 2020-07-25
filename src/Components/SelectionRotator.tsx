import React, { FunctionComponent, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles';
import LoopIcon from '@material-ui/icons/Loop';

interface SelectionRotatorProps {
  center: { x: number, y: number }
}

const useStyles = makeStyles(({ palette } : Theme) => ({

  rotator: {
    position: 'absolute',
    cursor: 'grab',
    pointerEvents: 'all'
  },

  rotatorActive: {
    position: 'absolute',
    cursor: 'grabbing',    
    pointerEvents: 'all'
  }

}));

const SelectionRotator : FunctionComponent<SelectionRotatorProps> = ({ center }) =>
{
    const classes = useStyles();
    const [isActive, setIsActive] = useState(false);

    let activeClass = classes.rotator;

    if (isActive)
    {
      activeClass = classes.rotatorActive;
    }

    return <svg onMouseDown={() => setIsActive(true)} onMouseUp={() => setIsActive(false)} className={activeClass} width={50} height={50} style={{
        left: center.x - 25,
        top: center.y - 25
    }}>
        <LoopIcon />
    </svg>;
}

export default SelectionRotator;
