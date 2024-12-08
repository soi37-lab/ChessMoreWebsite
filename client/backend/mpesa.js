const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

// Get Access Token
async function getAccessToken() {
    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
    const auth = Buffer.from(`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`).toString('base64');

    const response = await axios.get(url, {
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });

    return response.data.access_token;
}

// STK Push
app.post('/mpesa-stk', async (req, res) => {
    const { phone, amount } = req.body; // Expect phone and amount from frontend

    const accessToken = await getAccessToken();
    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "").slice(0, 14);
    const password = Buffer.from(
        `${process.env.BUSINESS_SHORTCODE}${process.env.PASSKEY}${timestamp}`
    ).toString('base64');

    const payload = {
        BusinessShortCode: process.env.BUSINESS_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: process.env.BUSINESS_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: process.env.CALLBACK_URL,
        AccountReference: "Chess Club Donation",
        TransactionDesc: "Donation Payment",
    };

    try {
        const response = await axios.post(url, payload, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        res.status(200).json({
            success: true,
            message: "STK Push sent. Check your phone to complete the payment.",
            data: response.data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to initiate STK Push",
            error: error.response ? error.response.data : error.message,
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
