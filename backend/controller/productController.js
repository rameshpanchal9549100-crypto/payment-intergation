import { instance } from "../server.js";
import crypto from 'crypto';

// Create Order
export const processPayment = async (req, res) => {
  try {
    if (!req.body.amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    const amount = Number(req.body.amount);

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    const options = {
      amount: amount * 100, // paise (required by Razorpay)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,

      // ✅ add these two fields
      displayAmount: amount,                 // ₹ (same as input)
      displayAmountFromOrder: order.amount / 100 // ₹ derived from Razorpay
    });

  } catch (error) {
    console.error("Payment Error:", error);

    res.status(500).json({
      success: false,
      message: "Payment processing failed",
      error: error.message,
    });
  }
};

// Get Razorpay Key
export const getkey = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      key: process.env.RAZORPAY_API_KEY,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch key",
    });
  }
};

export const paymentVerification = async(req,res) => {
   const {razorpay_payment_id,  razorpay_order_id,  razorpay_signature} = req.body

   const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto.createHmac("sha256",process.
      env.RAZORPAY_API_SECRET).update(body.toString()).digest("hex");
      // console.log(`RAZORPAY_SIGNATURE: ${razorpay_signature}`);
      // console.log(`EXPECTED_SIGNATURE: ${expectedSignature}`)
       const isAuthentic = expectedSignature === razorpay_signature;
       
       if(isAuthentic){
          return res.redirect(`http://localhost:5173/paymentSuccess?
             reference= ${razorpay_payment_id}`);
       }else{

       }
        res.status(200).json({
          success:true
        })
      
    


   res.status(200).json({
    success: true
   })
}