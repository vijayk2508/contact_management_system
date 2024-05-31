//npx api install "@eden-ai/v2.0#1kx78vlw7xinns"

const sdk = require("@api/eden-ai");

const api_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzRkZGJjZDEtYzU4NS00ZjE1LTgxMmUtYWZhMTBiYmRlNWJjIiwidHlwZSI6ImFwaV90b2tlbiJ9.t6ZQOR6TWOzhlFKO6jwY7d5Ceq_6sHg5ry4RmHTctRY";

sdk.auth(api_key);

sdk
  .image_face_compare_create({
    response_as_dict: true,
    attributes_as_list: false,
    show_original_response: false,
    providers: "amazon",
    file1_url: "https://edenai.s3.eu-west-1.amazonaws.com/test1.jpg",
    file2_url: "https://edenai.s3.eu-west-1.amazonaws.com/test2.jpg",
  })
  .then(({ data }) => console.log(JSON.stringify(data)))
  .catch((err) => console.error(err));


  
