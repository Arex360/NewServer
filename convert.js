const fs = require('fs');

// Function to convert an image to base64
function imageToBase64(filePath) {
    // Read the image file as a buffer
    const imageBuffer = fs.readFileSync(filePath);

    // Convert the buffer to a base64-encoded string
    const base64String = imageBuffer.toString('base64');

    return base64String;
}

// Function to save a base64-encoded string as an image file
function saveBase64AsImage(base64String, outputPath) {
    // Remove the data URI prefix and create a buffer from the base64 string
    const dataBuffer = Buffer.from(base64String, 'base64');

    // Write the buffer to the output path
    fs.writeFileSync(outputPath, dataBuffer);

    console.log('Image saved at:', outputPath);
}

// Example usage
const imagePath = 'c2.png';

// Convert the image to base64
const base64Image = imageToBase64(imagePath);
console.log(base64Image)
// Re-encode and save as new.png
const outputPath = 'new.png';
saveBase64AsImage(base64Image, outputPath);
