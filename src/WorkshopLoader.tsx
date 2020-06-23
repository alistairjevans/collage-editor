export interface WorkshopDetails
{
    name: string,
    images: string[]
}

export const loadWorkshop = async (folderUrl: string): Promise<WorkshopDetails> => 
{
    // From the folder URL, get the workshop.json file.
    const workshopDataUrl = new URL("workshop.json", folderUrl).href;

    try 
    {
        const request = await fetch(workshopDataUrl, {
            method: 'GET',
            mode: 'no-cors'
        });

        if (request.ok)
        {
            const jsonData = (await request.json()) as WorkshopDetails;

            if (!jsonData || !jsonData.name || !(jsonData.images instanceof Array))
            {
                throw new Error("Workshop data is not correctly formatted.");
            }

            // We have some workshop data.
            // Expand the image URLs.
            jsonData.images = jsonData.images.map(v => new URL(v, folderUrl).href); 

            return jsonData;
        }
        
        throw new Error(`Could not load workshop. Response from server: ${request.status} ${request.statusText}`);
    } 
    catch (e)
    {
        // Could not load workshop.
        throw new Error(`Could not load workshop; ${e}`);
    }
};