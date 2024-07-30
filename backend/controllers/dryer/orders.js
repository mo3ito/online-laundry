const OrdersModel = require("../../models/orders/Orders");
const DryerModel = require("../../models/dryer/DryerModel");

const ordersForDryer = async (req, res) => {
  const dryerId = req.headers.authorization;

  try {
    const Dryer = await DryerModel.findById(dryerId);
    if (!Dryer) {
      return res.status(400).json({
        message: "خشکشویی با این آیدی وجود ندارد",
      });
    }

    const orders = await OrdersModel.find({ is_done_all_order: false , "service_laundry.laundry_id": dryerId   });

    const filteredCollections = await orders.filter((item) =>
      item.orders.every((item) => item.situation === "تحویل گرفته شده")
    );

    const reverseFilterCollection = await filteredCollections.toReversed();

    return res.status(200).json(reverseFilterCollection);
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const doneOrdersByDryer = async (req, res) => {
  const dryerId = req.headers.authorization;

  try {
    const Dryer = await DryerModel.findById(dryerId);
    if (!Dryer) {
      return res.status(400).json({
        message: "خشکشویی با این آیدی وجود ندارد",
      });
    }

    const orders = await OrdersModel.find({ is_done_all_order: true , "service_laundry.laundry_id" : dryerId });
    const reverseOrders = await orders.toReversed()

    return res.status(200).json(reverseOrders);
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};



const doneOrder = async (req, res) => {
  const dryerId = req.headers.authorization;
  const { customer_id, _id } = req.body;

  try {
    const Dryer = await DryerModel.findById(dryerId);
    const customerOrdersList = await OrdersModel.find({
      customer_id: customer_id,
    });

    if (!Dryer) {
      return res.status(400).json({
        message: "خشکشویی با این آیدی وجود ندارد",
      });
    }

    if (!customerOrdersList.length) {
      return res.status(400).json({
        message: "مشتری با این آیدی وجود ندارد",
      });
    }

    const order = await OrdersModel.findOne({ customer_id, _id });

    order.is_done_all_order = true;
    await order.orders.map(
      (item) => (item.situation = "انجام سفارش، در انتظار ارسال")
    );
    await order.save();

    return res.status(200).json({
      message: "انجام سرویس با موفقیت ثبت شد",
    });
  } catch (error) {
    console.error("error:", error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { doneOrder, ordersForDryer, doneOrdersByDryer };
