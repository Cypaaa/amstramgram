import sharp from 'sharp';

export const resizeImageBuffer = async (buffer, width, height) => {
    let image = sharp(buffer);

    const metadata = await image.metadata();

    if (metadata.width > width || metadata.height > height) {
        image = image.resize({
            width: metadata.width > width ? width : null,
            height: metadata.height > height ? height : null,
            fit: 'inside', // Ensure the image fits within the specified dimensions
            withoutEnlargement: true // Prevent the image from being enlarged
        });
    }

    return await image.toBuffer();
};

export const compressImageBuffer = async (buffer, type, quality = 80) => {
    let image = sharp(buffer);

    if (type != 'jpeg' && type != 'png') {
        throw new Error('Image must be jpeg or png')
    }
    // Compress the image
    image = image[type]({ quality });

    // Return the compressed image buffer
    return await image.toBuffer();
};