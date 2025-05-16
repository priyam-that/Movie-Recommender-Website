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
// Routes 
router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)
// New Route: Update tokens after playing spin-the-wheel game
router.post("/update-tokens", authToken, updateTokensController)
router.post('/deduct/token', authToken,  deductTokenController);


router.put("/update-profile-pic", authToken, updateProfilepic)

module.exports = router