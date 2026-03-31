import app from "./app.js";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import connectDB from "./db.js";
dotenv.config();

connectDB()


export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET
});
console.log("KEY:", process.env.RAZORPAY_API_KEY);

const processPayment = (req,res)=>{
  res.status(200).json({
        success: true
    })
}
app.post("/payment/process", processPayment);




app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT ${process.env.PORT}`);
})