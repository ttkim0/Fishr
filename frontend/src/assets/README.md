# Assets Directory

## Required Images

Please save the following images to this directory:

1. **fishermen-dock.jpg** - The image of the fisherman at the dock with fish and monitor
   - This will be used in the Mission section of the landing page

2. **product-box.jpg** - The Fishr product packaging image with camera and QR code
   - This will be used in the "How It Works" section (Step 4)

## Current Status

The landing page is currently using placeholder images from Unsplash. Once you save the actual product images here, update the paths in `Landing.js`:

```javascript
// Replace these lines:
const fishermenImage = 'https://images.unsplash.com/...';
const productBoxImage = 'https://images.unsplash.com/...';

// With these:
import fishermenImage from '../assets/fishermen-dock.jpg';
import productBoxImage from '../assets/product-box.jpg';
```

The images you provided in the chat need to be saved to this folder with the names above.


