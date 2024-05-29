import React, { useState, useRef, useEffect } from "react";
import { face_comparison, uploadImages } from "../Services/edenServiceAPI";

const EdenFaceComponent = () => {
  const [image1, setImage1] = useState(
    "https://edenai.s3.eu-west-1.amazonaws.com/WIN_20240529_13_00_01_Pro.jpg"
  );
  const [image2, setImage2] = useState(
    "https://edenai.s3.eu-west-1.amazonaws.com/aman-gupta.jpg",
   //"https://edenai.s3.eu-west-1.amazonaws.com/WIN_20240529_13_00_02_Pro.jpg"
   "https://edenai.s3.eu-west-1.amazonaws.com/new.jpg"
  );

  const [comparisonResult, setComparisonResult] = useState(null);
  // const videoRef1 = useRef(null);
  // const videoRef2 = useRef(null);

  // const handleImageUpload = (setImage) => (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setImage(reader.result);
  //   };
  //   reader.readAsDataURL(file);
  // };

  // const handleCaptureImage = (videoRef, setImage) => () => {
  //   const video = videoRef.current;

  //   if (video) {
  //     const canvas = document.createElement("canvas");
  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoHeight;
  //     const context = canvas.getContext("2d");
  //     context.drawImage(video, 0, 0, canvas.width, canvas.height);

  //     canvas.toBlob((blob) => {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setImage(reader.result);
  //       };
  //       reader.readAsDataURL(blob);
  //     }, "image/jpeg");
  //   }
  // };

  const handleCompareImages = async () => {
    if (!image1 || !image2) {
      setComparisonResult(
        "Please upload or capture both images before comparing."
      );
      return;
    }

    try {
      const result = await face_comparison(image1,image2);
      setComparisonResult(result.message || "Comparison successful");
    } catch (error) {
      setComparisonResult("Error comparing images: " + error.message);
    }
  };

  // useEffect(() => {
  //   const setupVideo = (videoRef) => {
  //     navigator.mediaDevices
  //       .getUserMedia({ video: true })
  //       .then((stream) => {
  //         if (videoRef.current) {
  //           videoRef.current.srcObject = stream;
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error accessing webcam: ", error);
  //       });
  //   };

  //   setupVideo(videoRef1);
  //   setupVideo(videoRef2);
  // }, []);

  return (
    <div>
      <h1>Face Comparison App</h1>
      {/* <div>
        <h2>Upload Image 1</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload(setImage1)}
        />
        <video
          ref={videoRef1}
          autoPlay
          style={{ display: image1 ? "none" : "block" }}
        />
        <button onClick={handleCaptureImage(videoRef1, setImage1)}>
          Capture from Camera
        </button>
        {image1 && <img src={image1} alt="Image 1" />}
      </div>
      <div>
        <h2>Upload Image 2</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload(setImage2)}
        />
        <video
          ref={videoRef2}
          autoPlay
          style={{ display: image2 ? "none" : "block" }}
        />
        <button onClick={handleCaptureImage(videoRef2, setImage2)}>
          Capture from Camera
        </button>
        {image2 && <img src={image2} alt="Image 2" />}
      </div> */}
      {image1 && <img style={{height : "100px"}} src={image1} alt="Image 1" />}
      {image2 && <img style={{height : "100px"}} src={image2} alt="Image 2" />}
      <button onClick={handleCompareImages}>Compare Images</button>
      {comparisonResult && <p>Comparison Result: {comparisonResult}</p>}
    </div>
  );
};

export default EdenFaceComponent;
