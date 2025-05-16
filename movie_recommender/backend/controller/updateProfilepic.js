const User = require("../models/userModel");

const updateProfilepic = async (req, res) => {
  try {
    const userId = req.userId;
    const { profilePic } = req.body;
    // check if Profile pic is provided
    if (!profilePic) {
      return res.status(400).json({ success: false, message: "No profile picture provided" });
    }
    // find the user in the Db 
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    //update the profile pic
    user.profilePic = profilePic;
    await user.save();

    res.json({ success: true, message: "Profile picture updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

module.exports = updateProfilepic ;
