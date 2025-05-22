const express = require('express')
const router = express.Router()

const userSignUpController = require("../controller/userSignUp")
const userSignInController = require('../controller/userSignIn')
const userDetailsController = require('../controller/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/userLogout')
const {
    updateTokensController,
    deductTokenController
  } = require('../controller/token');// Import token update controller
const updateProfilepic  = require('../controller/updateProfilepic');
const { addToWishlist, removeFromWishlist, getWishlist } = require('../controller/wishlistController');

// Routes 
router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)
// New Route: Update tokens after playing spin-the-wheel game
router.post("/update-tokens", authToken, updateTokensController)
router.post('/deduct/token', authToken,  deductTokenController);


router.put("/update-profile-pic", authToken, updateProfilepic)

// Wishlist routes
router.post("/wishlist/add", authToken, addToWishlist);
router.post("/wishlist/remove", authToken, removeFromWishlist);
router.get("/wishlist", authToken, getWishlist);

module.exports = router