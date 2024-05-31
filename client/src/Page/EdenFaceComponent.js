import React, { useState } from "react";
import { face_comparison } from "../Services/edenServiceAPI";

const images = [
  "https://contact-management-system-lake.vercel.app/images/aman-gupta.jpg",
  "https://contact-management-system-lake.vercel.app/images/new.jpg",
  "https://contact-management-system-lake.vercel.app/images/test1.jpg",
  "https://contact-management-system-lake.vercel.app/images/test2.jpg",
];

const EdenFaceComponent = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageType, setSelectedImageType] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleCompareImages = async () => {
    if (!image1 || !image2) {
      setComparisonResult(
        "Please upload or capture both images before comparing."
      );
      return;
    }

    setLoading(true); // Set loading to true before making the comparison

    try {
      const result = await face_comparison(image1, image2);
      console.log(result?.amazon?.items?.[0]?.confidence);
      setComparisonResult({
        per:
          Math.floor(result?.amazon?.items?.[0]?.confidence * 100000) / 1000 ||
          0,
        boundingBox: result?.amazon?.items?.[0]?.bounding_box || null,
      });
    } catch (error) {
      setComparisonResult("Error comparing images: " + error.message);
    } finally {
      setLoading(false); // Set loading to false after comparison completes
    }
  };

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  const handleSetImage = (url) => {
    if (selectedImageType === "image1") {
      setImage1(url);
    } else if (selectedImageType === "image2") {
      setImage2(url);
    }
    setSelectedImage(null); // Close the modal
    setSelectedImageType(null); // Reset selected image type
  };

  return (
    <div className="main">
      <div id="heading">
        <h1>Face Comparison App</h1>
      </div>
      <div className="container">
        <div className="left-panel">
          <div className="gallery">
            {images.map((url, index) => (
              <div
                className={`image-container ${
                  url === image1 ? "selected-image1" : ""
                } ${url === image2 ? "selected-image2" : ""}`}
                key={index}
                onClick={() => handleImageClick(url)}
                style={
                  index === images.length - 1
                    ? {
                        marginBottom: "120px",
                      }
                    : {}
                }
              >
                <img src={url} alt={`img-${index}`} className="image" />
              </div>
            ))}
          </div>
        </div>
        <div className="right-panel">
          <div className="selected-images">
            <div
              className={`selected-image-container ${
                image1 ? "selected-image1" : ""
              }`}
            >
              {image1 ? (
                <img src={image1} alt="Selected 1" className="image" />
              ) : (
                <div className="placeholder">Select Image 1</div>
              )}

              {comparisonResult?.boundingBox && (
                <div
                  className="bounding-box"
                  style={{
                    top: `${comparisonResult?.boundingBox.top * 100}%`,
                    left: `${comparisonResult?.boundingBox.left * 100}%`,
                    height: `${comparisonResult?.boundingBox.height * 100}%`,
                    width: `${comparisonResult?.boundingBox.width * 100}%`,
                  }}
                ></div>
              )}
            </div>

            <div
              className={`selected-image-container ${
                image2 ? "selected-image2" : ""
              }`}
            >
              {image2 ? (
                <img src={image2} alt="Selected 2" className="image" />
              ) : (
                <div className="placeholder">Select Image 2</div>
              )}
            </div>
          </div>

          <div>
            <button
              disabled={!image1 || !image2 || loading}
              onClick={handleCompareImages}
            >
              {loading ? "Comparing..." : "Compare Images"}
            </button>
            {comparisonResult !== null && (
              <p>Comparison Result: {comparisonResult?.per}</p>
            )}
          </div>
        </div>
      </div>
      {/* Modal for selecting image */}
      {selectedImage && (
        <div className="modal">
          <div className="modal-content">
            <p>Set the selected image as:</p>
            <label>
              <input
                type="radio"
                name="setImage"
                value="image1"
                onChange={() => setSelectedImageType("image1")}
                checked={selectedImageType === "image1"}
              />
              Image 1
            </label>
            <label>
              <input
                type="radio"
                name="setImage"
                value="image2"
                onChange={() => setSelectedImageType("image2")}
                checked={selectedImageType === "image2"}
              />
              Image 2
            </label>
            <button onClick={() => handleSetImage(selectedImage)}>Yes</button>
            <button onClick={() => setSelectedImage(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EdenFaceComponent;
