import { Jimp } from 'jimp';

async function removeBackground() {
    try {
        const image = await Jimp.read('public/logo.png');
        const targetColor = { r: 255, g: 255, b: 255, a: 255 }; // White
        const replaceColor = { r: 0, g: 0, b: 0, a: 0 }; // Transparent
        const threshold = 30; // Similarity threshold

        image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
            const red = image.bitmap.data[idx];
            const green = image.bitmap.data[idx + 1];
            const blue = image.bitmap.data[idx + 2];

            // Check distance from white
            if (
                Math.abs(red - targetColor.r) < threshold &&
                Math.abs(green - targetColor.g) < threshold &&
                Math.abs(blue - targetColor.b) < threshold
            ) {
                image.bitmap.data[idx + 3] = 0; // Set alpha to 0
            }
        });

        await image.write('public/logo.png');
        console.log('Successfully removed background from public/logo.png');
    } catch (error) {
        console.error('Error processing image:', error);
    }
}

removeBackground();
