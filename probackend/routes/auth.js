var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const { signout, signup,signin,isSignedIn } = require("../controllers/auth");

router.get("/signout", signout);
router.post(
  "/signup",
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be more than of 3 characters"),
  body("email").isEmail().withMessage("Email is required"),
  body("encry_password")
    .isLength({ min: 3 })
    .withMessage("password must be more than of 3 characters"),
  signup
);


router.post(
  "/signin",
  body("email").isEmail().withMessage("Email is required"),
  body("encry_password")
    .isLength({ min: 3 })
    .withMessage("password field is required"),
  signin
);

router.get("/testroute",isSignedIn,(req,res)=>{
  res.send("A protected route");
})

module.exports = router;
