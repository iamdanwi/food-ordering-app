export const DEFAULT_FOOD_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c";

export const getImageUrl = (url: string) => {
    // List of valid image domains we're using
    const validDomains = [
        'images.unsplash.com',
        'res.cloudinary.com',
        // Add other domains as needed
    ];

    try {
        const urlObj = new URL(url);
        if (validDomains.some(domain => urlObj.hostname.includes(domain))) {
            return url;
        }
        return DEFAULT_FOOD_IMAGE;
    } catch {
        return DEFAULT_FOOD_IMAGE;
    }
}; 