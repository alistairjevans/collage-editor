import React, { useCallback, FunctionComponent, useState, useEffect } from 'react';
import panzoom, { PanZoom } from 'panzoom';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    board: {
        position: "fixed",
        left: 0,
        top: 0,
        height: '100%',
        width: '100%'
    }
});

const Board:FunctionComponent<{ active?: boolean, onScaleChanged?: (scale: number) => void }> = ({ active = true, onScaleChanged, children }) =>
{
    const [panZoomInstance, setPanZoomInstance] = useState<PanZoom | null>(null);
    const [isPanZoomInitialised, setIsPanZoomInitialised] = useState(false);

    const pannedRef = useCallback((node: HTMLDivElement) => {

        setPanZoomInstance(panzoom(node));
        setIsPanZoomInitialised(true);

    }, []);

    useEffect(() => {
        
        if (onScaleChanged && isPanZoomInitialised)
        {
            panZoomInstance!.on('zoom', (e) => 
            {
                onScaleChanged(panZoomInstance!.getTransform().scale);
            });
        }

    }, [isPanZoomInitialised, onScaleChanged])

    useEffect(() => {

        if (!panZoomInstance)
        {
            return;
        }

        if (active)
        {
            panZoomInstance.resume();
        }
        else 
        {
            panZoomInstance.pause();
        }

    }, [active, panZoomInstance])

    const classes = useStyles();

    return <div className={classes.board}>
        <div ref={pannedRef}>
            {children}
        </div>
    </div>
}

export default Board;