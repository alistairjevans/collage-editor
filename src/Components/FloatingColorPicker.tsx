import React, { FunctionComponent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChromePicker, ColorResult } from 'react-color';
import { makeStyles } from '@material-ui/core/styles';

const modalRoot = document.getElementById("modalRoot");

const useStyles = makeStyles(() => ({
  colorPickerContainer: {
    display: "inline-block",
    position: "absolute",
    bottom: "70px",
    left: "65px"
  },  
  
  '@media (min-width: 600px)': {
    colorPickerContainer: {
        left: "165px"
      },  
    }
}));

const FloatingColorPicker : FunctionComponent<{ display: boolean, initialColor?: string, onColorChange?: (color: string) => void }> = (
    { display, initialColor, onColorChange }) =>
{
    const classes = useStyles();
    
    const [el] = useState(() => {
        let element = document.createElement('div');
        element.classList.add(classes.colorPickerContainer);
        return element;
    });

    const [currentColor, setCurrentColor] = useState(initialColor);

    useEffect(() => 
    {
        modalRoot?.appendChild(el);

        return () => { modalRoot?.removeChild(el); };

    }, [el]);

    const handleColorChange = (color: ColorResult) => {
        setCurrentColor(color.hex);
        onColorChange?.(color.hex);        
    };
    
    if (display)
    {
        let picker = <ChromePicker disableAlpha={true} color={currentColor} onChange={handleColorChange} />

        return createPortal(picker, el);
    }
    
    return <React.Fragment></React.Fragment>;
}

export default FloatingColorPicker;