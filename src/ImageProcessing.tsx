import { GridDetect, contour, Point } from "./MarchingSquares";

export interface ImageData 
{
    height: number,
    dataUrl: string,
    width: number,
    boundingPoints: Point[]
}

export const  getImageData = async (imageUrl: string, workingCanvas: HTMLCanvasElement) : Promise<ImageData> =>
{
    let loadPromise = new Promise<HTMLImageElement>((resolve, reject) => {        
        const imageElement = new Image();
        imageElement.crossOrigin = "anonymous";
        imageElement.onload = ev => {
            resolve(imageElement);
        };
        imageElement.onerror = ev => {
            reject(`Could not load image from ${imageUrl}.`);
        }
        imageElement.src = imageUrl;
    });

    const loadedImage = await loadPromise;

    // First off, resize the canvas.
    const canvasWidth = workingCanvas.width = loadedImage.width;
    const canvasHeight = workingCanvas.height = loadedImage.height;

    const drawContext = workingCanvas.getContext("2d")!;

    drawContext.clearRect(0, 0, workingCanvas.width, workingCanvas.height);

    drawContext.drawImage(loadedImage, 0 ,0);

    const pixelData = drawContext.getImageData(0, 0, workingCanvas.width, workingCanvas.height)
                                 .data;
   
    // This is used by the marching ants algorithm
    // to determine the outline of the non-transparent
    // pixels on the image
    const defineNonTransparent: GridDetect = function (x, y)
    {
        var a=pixelData[(y*canvasWidth+x)*4+3];
        return(a>20);
    }

    var points = contour(defineNonTransparent);

    return {
        width: canvasWidth,
        height: canvasHeight,
        boundingPoints: points,
        dataUrl: workingCanvas.toDataURL()
    };
}

export const getClipPath = (imgData: ImageData) : string => 
{
    let clipPathSet : string[] = [];

    imgData.boundingPoints.forEach(p => clipPathSet.push(`${p.x}px ${p.y}px`));

    return clipPathSet.join(',');
};

export const getBoundingPolygonPath = (imgData: ImageData) : string => 
{
    let polygonPathSet : string[] = [];

    imgData.boundingPoints.forEach(p => polygonPathSet.push(`${p.x},${p.y}`));

    return polygonPathSet.join(' ');
};