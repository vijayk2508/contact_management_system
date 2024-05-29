import axios from "axios";
import API_CONSTANT from "../Constant/API_Constant";
import ServiceAPI from "./ServiceAPI";

const api_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzRkZGJjZDEtYzU4NS00ZjE1LTgxMmUtYWZhMTBiYmRlNWJjIiwidHlwZSI6InNhbmRib3hfYXBpX3Rva2VuIn0.b3YWMzRrnowAf2Bdc2F-TLmvwezAhOKYW5hZUZA_4vg";
const headers = {
  accept: "application/json",
  "content-type": "application/json",
  authorization: `Bearer ${api_key}`,
};

async function face_comparison(file1_url, file2_url) {
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({
      providers: "facepp,amazon,base64",
      file1_url,
      file2_url,
    }),
  };

  return fetch("https://api.edenai.run/v2/image/face_compare", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

function face_recognition() {
  const options = {
    method: "POST",
    headers,
  };

  fetch("https://api.edenai.run/v2/image/face_recognition/add_face", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

async function uploadImages(selectedFiles) {
  const formData = new FormData();
  for (let i = 0; i < selectedFiles.length; i++) {
    formData.append("images", selectedFiles[i]);
  }

  return await axios.post("http://localhost:8080/edenAIAPI/face_comparison", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export { face_comparison, face_recognition, uploadImages };
