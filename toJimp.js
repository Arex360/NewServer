const fs = require('fs');
const Jimp = require('jimp');

// Function to convert a JPEG image to PNG
async function convertJpgToPng(inputPath, outputPath) {
    try {
        // Read the JPEG image using Jimp
        const image = await Jimp.read(inputPath);

        // Create a new Jimp object for writing the image in PNG format
        const pngImage = new Jimp(image.getWidth(), image.getHeight(), 0xFFFFFFFF); // 0xFFFFFFFF is a white background, adjust as needed

        // Blit the JPEG image onto the new PNG image
        pngImage.blit(image, 0, 0);

        // Write the PNG image to the specified output path
        await pngImage.writeAsync(outputPath);

        console.log('Conversion complete. Image saved at:', outputPath);
    } catch (error) {
        console.error('Error converting image:', error);
    }
}

// Example usage
const jpgImagePath = 'new.png';
const pngImagePath = 'output.png';

convertJpgToPng(jpgImagePath, pngImagePath);
