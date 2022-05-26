const express=require("express");
const router=express.Router();

const {isAuthenticated,isAdmin,isSignedIn}= require("../controllers/auth");
const {getUserById,pushOrderInPurchaseList}= require("../controllers/user");
const {updateStock}=require("../controllers/product");


const {getOrderById,createOrder,getAllOrders,getOrderStatus,updateStatus}= require("../controllers/order");

//params
router.param("userId",getUserById);
router.param("orderId",getOrderById);

//actual routes

// create
router.post("/order/create/:userId",isSignedIn,isAuthenticated,isAdmin,pushOrderInPurchaseList,updateStock,createOrder);

// read
router.get("/order/all/:userId",isSignedIn,isAuthenticated,isAdmin,getAllOrders);

//status route
router.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getOrderStatus);
router.put("/order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin,updateStatus);

module.exports=router;