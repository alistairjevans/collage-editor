
export interface SavedWorkshopState {
    backgroundColor: string,
    images: {
        url: string,
        inUse: boolean, 
        x: number, 
        y: number 
    }[]
}

export interface AvailableWorkshopImage {
    url: string;
    inUse: boolean;
    initialX: number,
    initialY: number,
    rotate: number
}

export interface ImageInitData
{
    url: string,
    imageSize: { width: number, height : number }
    borderPoints: string
}

export interface ImageState extends ImageInitData
{
    inUse: boolean,
    rotate: number,
    boundingRect: BoundingRect
}

export interface BoundingRect { 
    left: number;
    right: number;
    top: number;
    bottom: number;
}