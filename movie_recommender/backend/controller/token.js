const User = require("../models/userModel"); // Import User model


// for adding tokens
const updateTokensController = async (req, res) => {
  try {
    const { userId, tokensWon } = req.body;

    console.log("Received Request - userId:", userId, "tokensWon:", tokensWon); // Debugging log

    // Find user in the database
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log("User found:", user); // Debugging log

    // Ensure tokens field exists
    if (typeof user.tokens !== "number") {
      user.tokens = 0; // Initialize tokens if missing
    }

    // Update tokens
    user.tokens += tokensWon;
    await user.save();

    console.log("Updated tokens:", user.tokens); // Debugging log

    res.json({ success: true, tokens: user.tokens });
  } catch (error) {
    console.error("Error updating tokens:", error); // Debugging log
    res.status(500).json({ message: "Server error", error });
  }
};
// for duction of tokens
const deductTokenController = async (req, res) => {
  try {
    const  userId  = req.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (typeof user.tokens !== "number") {
      user.tokens = 0;
    }
    
    if (user.tokens <= 10000) {
      return res.status(400).json({ message: "Insufficient tokens" });
    }

    user.tokens -= 10000;
    await user.save();

    res.json({
      success: true,
      message: " token deducted successfully",
      tokens: user.tokens,
    });
  } catch (error) {
    console.error("Error deducting token:", error);
    res.status(500).json({ message: "Server error", error });
  }
};




module.exports = {updateTokensController,
                  deductTokenController,
};
