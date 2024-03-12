// import thu vien-----------
const express = require('express');
const mongoose = require('mongoose');

// tao doi tuong moi cho express
const app = express();
// ket noi voi csdl mongoose --------------------------
mongoose.connect('mongodb+srv://dinhtrongkien2004:kien2004@student.bimp0eo.mongodb.net/?retryWrites=true&w=majority&appName=Student',{
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(()=>{
    console.log("Ket noi thanh cong voi mongodb");
}).catch((err) =>{
    console.log("Loi : "+err);
});
// truy van co so du lieu-----------------------------
//chon csdl thao thac
const sample_restaurants = mongoose.connection.useDb('sample_restaurants');
// dinh nghia model cho bang du lieu
const neighborhoodsSchema = new mongoose.Schema({
    masv : String,
    tensv : String
});
// anh xa model vao bang du lieu
const neighborhoods = sample_restaurants.model('neighborhoods', neighborhoodsSchema);
//tao link de trieu goi tren tinh duyet (API)
app.get('/', async (req, res)=>{
    try {
        const Neighborhoods = await neighborhoods.find();// doc du lieu tu bang sinh vien
        if(Neighborhoods.length>0){// neu co ton tai du lieu
            res.json(Neighborhoods);// api tra ve ket qua
        }else{
            res.status(404).json({error: "Khong co sinh vien"});
        }
    } catch (error) {
        console.error("Loi doc du lieu: ");
        res.status(500).json({error: "Doc loi du lieu"});
    }
});
// khoi chay may chu------------------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("Server dang chay o cong 5000");
});
module.exports=app;
