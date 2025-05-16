

const userModel = require("../models/userModel");

// User details controller function
async function userDetailsController(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        error: true,
        success: false,
        message: "Unauthorized access. User ID missing.",
      });
    }

    console.log("Fetching details for user ID:", req.userId);

    const user = await userModel.findById(req.userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({
        error: true,
        success: false,
        message: "User not found.",
      });
    }

    console.log("User found:", user);

    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User details retrieved successfully.",
    });

  } catch (err) {
    console.error("Error fetching user details:", err);
    res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

module.exports = userDetailsController;
