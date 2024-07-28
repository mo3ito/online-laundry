const express = require("express");
const router = express.Router();

const {
  adminRegister,
  adminLogin,
} = require("../controllers/admin/registration");
const {
  getAllDriver,
  verifyDriver,
  deleteDriver,
  getAlcustomers,
  paidOrders,
  gotOrders,
  deleteOrder,
  deletePaidOrder,
  getAllOrders,
  getAllCategoryImages,
  getAllTypeImages,
  deleteCategoryImage,
  deleteTypeImage,
  deleteCustomer,
  unverifiedDryerByAdmin,
  confirmVerifiedDryerByAdmin,
  deleteUnverifiedDryer,
  getAllDryer,
  deleteDryer
} = require("../controllers/admin/control");

router.post("/admin/register", adminRegister);
router.post("/admin/login", adminLogin);
router.get("/admin/get-all-drivers", getAllDriver);
router.put("/admin/verify-driver", verifyDriver);
router.delete("/admin/delete-driver", deleteDriver);
router.get("/admin/get-all-customers", getAlcustomers);
router.delete("/admin/delete-customer", deleteCustomer);
router.get("/admin/paid-orders", paidOrders);
router.get("/admin/got-orders", gotOrders);
router.delete("/admin/delete-order", deleteOrder);
router.delete("/admin/delete-paid-order", deletePaidOrder);
router.get("/admin/get-all-orders", getAllOrders);
router.get("/admin/get-all-category-images", getAllCategoryImages);
router.get("/admin/get-all-type-images", getAllTypeImages);
router.delete("/admin/delete-category-image", deleteCategoryImage);
router.delete("/admin/delete-type-image", deleteTypeImage);
router.get("/admin/unverified-dryer-by-admin", unverifiedDryerByAdmin);
router.post("/admin/confirm-verified-dryer-by-admin",confirmVerifiedDryerByAdmin)
router.delete("/admin/delete-unverified-dryer",deleteUnverifiedDryer)
router.get("/admin/get-all-dryers", getAllDryer)
router.delete("/admin/delete-verified-dryer",deleteDryer)

module.exports = router;
