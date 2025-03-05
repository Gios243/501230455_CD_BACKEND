import mongoose from "mongoose";
const uri ="mongodb://127.0.0.1:27017/"
const dbName ="cd_backend"
export default function mongoConnect(){
    try{
        mongoose.connect(`${uri}${dbName}`)
        console.log("Connect successfully !");
    } catch(error){
        console.error(error);
        console.error("Connection failed !");
    }
}