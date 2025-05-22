const userModel = require('../models/userModel');

// Add movie to wishlist
const addToWishlist = async (req, res) => {
    try {
        const { movie } = req.body;
        const userId = req.userId;

        if (!movie || !movie.id || !movie.title || !movie.poster_path) {
            return res.status(400).json({ message: "Invalid movie data" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if movie already exists in wishlist
        const movieExists = user.wishlist.some(item => item.id === movie.id);
        if (movieExists) {
            return res.status(400).json({ message: "Movie already in wishlist", wishlist: user.wishlist });
        }

        user.wishlist.push(movie);
        await user.save();

        res.status(200).json({ message: "Movie added to wishlist successfully", wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: "Error adding movie to wishlist", error: error.message });
    }
};

// Remove movie from wishlist
const removeFromWishlist = async (req, res) => {
    try {
        const { movieId } = req.body;
        const userId = req.userId;

        if (!movieId) {
            return res.status(400).json({ message: "Movie ID is required" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const initialWishlistLength = user.wishlist.length;
        user.wishlist = user.wishlist.filter(item => item.id !== movieId);

        if (user.wishlist.length === initialWishlistLength) {
            return res.status(404).json({ message: "Movie not found in wishlist" });
        }

        await user.save();
        res.status(200).json({ message: "Movie removed from wishlist successfully", wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: "Error removing movie from wishlist", error: error.message });
    }
};

// Get user's wishlist
const getWishlist = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId).select('wishlist'); // Only select the wishlist

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ message: "Error fetching wishlist", error: error.message });
    }
};

module.exports = {
    addToWishlist,
    removeFromWishlist,
    getWishlist
};
