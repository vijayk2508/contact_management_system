import axios from "axios";

async function face_comparison(file1_url, file2_url) {
  const options = {
    method: "POST",
    url: "https://api.edenai.run/v2/image/face_compare",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzRkZGJjZDEtYzU4NS00ZjE1LTgxMmUtYWZhMTBiYmRlNWJjIiwidHlwZSI6ImFwaV90b2tlbiJ9.t6ZQOR6TWOzhlFKO6jwY7d5Ceq_6sHg5ry4RmHTctRY",
      "Content-Type": "application/json",
    },
    data: {
      providers: ["amazon"],
      file1_url: file1_url,
      file2_url: file2_url,
      fallback_providers: [],
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error comparing images:", error);
    throw error;
  }
}

export { face_comparison };
