import mercadopago from "mercadopago"


export const createOrder10 = async (req, res) => {
    
    mercadopago.configure({
        access_token: "APP_USR-7385675390529598-092316-4bdaa6e8417e66e2376e94ad73f0af20-1489469118"
    })
    try{
        const result = await mercadopago.preferences.create({
        items:[
            {
                title: "Donation",
                currency_id: "ARS",
                unit_price: 1000,
                quantity: 1,
            },
        ],
        back_urls:{
            success: "http://localhost:5173/donationOk",
        },
        notification_url: "https://96e1-168-197-200-34.ngrok-free.app/webhook"
    })
    
    console.log(result);

    
    res.json(result.body);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
}


export const receiveWebhook10 = async (req, res) => {
    const payment = req.query;
    
    try {
      
      if (payment.type === "payment") {
        const data = await mercadopago.payment.findById(payment["data.id"]);
      
      }
  
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something goes wrong" });
    }
  };
