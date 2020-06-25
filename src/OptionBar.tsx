import React, { FunctionComponent } from 'react';
import { ImageState } from './Components/Image';
import { AppBar, Toolbar, Typography, IconButton, CssBaseline, Divider } from '@material-ui/core';
import CropFreeRoundedIcon from '@material-ui/icons/CropFreeRounded';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

    bar: {
        top: 'auto;',
        bottom: 0,
        boxShadow: "0px -4px 5px 0px rgba(0, 0, 0, 0.21)"
    },

    divider: {
        marginLeft: '10px',
    },

    buttonContainer: {
        marginLeft: '10px'
    }

}));

export const OptionBar: FunctionComponent<{ 
    activeImage?: ImageState | null,
    onZoomToFit?: () => void,
    onUpOne?: () => void,
    onDownOne?: () => void
}> = ({ activeImage, onZoomToFit, onUpOne, onDownOne }) => {

  const classes = useStyles();

  return <React.Fragment>
        <CssBaseline />
        <AppBar className={classes.bar} color="primary" elevation={16} position="fixed">
            <Toolbar>
                <Typography variant="h6">
                    CollageIt
                </Typography>
                <Divider className={classes.divider} orientation="vertical" flexItem />
                {/* <IconButton edge="end" color="inherit" onClick={onZoomToFit}>
                    <CropFreeRoundedIcon />
                </IconButton> */}
                <IconButton edge="end" color="inherit" disabled={activeImage === null} onClick={onUpOne}>
                    <ArrowUpwardRoundedIcon />
                </IconButton>
                <IconButton edge="end" color="inherit" disabled={activeImage === null} onClick={onDownOne}>
                    <ArrowDownwardRoundedIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
  </React.Fragment> ;

};
