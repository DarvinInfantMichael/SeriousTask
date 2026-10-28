import express from "express"
import { CollectData, GetData } from "../controller/DemoController.js";

const apii=express.Router();

apii.post("/postData",CollectData);
apii.get("/getData",GetData);

export default apii;


// http://localhost/5000/api/getData
// http://localhost/5000/api/postData