// const cloudinary= require('cloudinary');
import cloudinary from "cloudinary";

// const dotenv=require('dotenv');
import dotenv from "dotenv"

dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
const uploads=(file,folder)=>{
  return new Promise(resolve=>{
      cloudinary.uploader.upload(file,(result)=>{
          resolve({
              url:result.url,
              id:result.public_id
          })
      },{
          resource_type:"auto",
          folder:folder
      })
  })
}

export default uploads