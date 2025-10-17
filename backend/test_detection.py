"""
Test script for Fishr fish detection
Usage: python test_detection.py <image_path>
"""

import sys
from fish_detector import FishDetector
from PIL import Image

def test_detection(image_path):
    """Test fish detection on an image"""
    print(f"🐟 Testing Fishr Detection on: {image_path}")
    print("=" * 50)
    
    # Initialize detector
    print("\n1. Loading YOLOv8 model...")
    detector = FishDetector()
    print("   ✅ Model loaded successfully!")
    
    # Load image
    print(f"\n2. Loading image: {image_path}")
    try:
        image = Image.open(image_path)
        print(f"   ✅ Image loaded: {image.size[0]}x{image.size[1]} pixels")
    except Exception as e:
        print(f"   ❌ Error loading image: {e}")
        return
    
    # Detect fish
    print("\n3. Running fish detection...")
    results = detector.detect(image)
    
    # Display results
    print(f"\n4. Detection Results:")
    print("=" * 50)
    
    if len(results) == 0:
        print("   ❌ No fish detected in the image")
        print("   💡 Try an image with clearer fish visibility")
    else:
        print(f"   🎉 Detected {len(results)} fish!\n")
        
        for i, fish in enumerate(results, 1):
            print(f"   Fish #{i}:")
            print(f"      🐠 Type: {fish['fish_type']}")
            print(f"      ⚖️  Weight: {fish['weight']} lbs")
            print(f"      📊 Confidence: {fish['confidence']*100:.1f}%")
            print(f"      📍 Bounding Box: {fish['bbox']}")
            print()
    
    print("=" * 50)
    print("✅ Test complete!")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python test_detection.py <image_path>")
        print("Example: python test_detection.py fish_image.jpg")
        sys.exit(1)
    
    image_path = sys.argv[1]
    test_detection(image_path)
