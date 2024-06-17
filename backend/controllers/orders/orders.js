const OrdersModel = require("../../models/orders/Orders");
const CustomersModel = require("../../models/customer/CustomerModel");

const sendOrders = async (req, res) => {
  const customerId = req.headers.authorization;

  const {
    name,
    last_name,
    phone_number,
    orders,
    address,
    latitude,
    longitude,
  } = req.body;

  try {
    const customer = await CustomersModel.findById(customerId);

    if (!customer) {
      return res.status(400).json({
        message: "مشتری با چنین آیدی وجود ندارد",
      });
    }

    if (
      !name &&
      !last_name &&
      phone_number &&
      !orders &&
      !latitude &&
      !longitude
    ) {
      return res.status(400).json({
        message: "لطفا همه‌ی فیلدهای مورد نیاز را پر کنید",
      });
    }

    const ordersInfos = {
      customer_id : customerId,
      name,
      last_name,
      phone_number,
      orders,
      address,
      latitude,
      longitude,
    };

    const newOrdersModel = await new OrdersModel(ordersInfos);

    await newOrdersModel.save();

    res.status(200).json({
      message: "سفارش با موفقیت ثبت شد",
      ordersInfo: newOrdersModel,
    });
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: "خطایی رخ داد",
    });
  }
};


const getOrdersCustomer =async(req , res)=>{

  const customerId = req.headers.authorization


  try {

    if(!customerId){
      return res.status(400).json({
        message: "آیدی مشتری وارد نشده است"
      })
    }
    
    const orders = await OrdersModel.find({customer_id : customerId })

    return res.status(200).json(orders)

  } catch (error) {
    
  }

}

module.exports = { sendOrders , getOrdersCustomer };
