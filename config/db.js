import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

//BU İŞLEMDEN SONRA SERVER.JS KISMINA GİT APP.LİSTEN İÇERİSİNE  connectDB() ekle
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log("MongoDb Connected: " + conn.connection.host);
  } catch (error) {
    console.error("Error connection to MONGODB: " + error.messsage);
    process.exit(1); //eğer ki 1 ise hata 0 ise herşey yolunda
  }
};
