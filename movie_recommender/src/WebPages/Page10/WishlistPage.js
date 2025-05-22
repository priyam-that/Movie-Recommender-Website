import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SummaryApi from '../../common';
import { FaTrash } from 'react-icons/fa'; // Assuming react-icons is available
import styles from '../Styles/wishlistPage.module.css'; // Create this CSS module next
import { Link } from 'react-router-dom'; // For a "Browse Movies" link if wishlist is empty

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userDetails = useSelector(state => state.user.user);

    const fetchWishlist = useCallback(async () => {
        if (!userDetails?._id) {
            // setError("Please login to view your wishlist.");
            // setLoading(false);
            // This case should ideally be handled by a protected route in App.js
            // For now, if userDetails are not loaded, we might show loading or an error.
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.getWishlist.url, {
                method: SummaryApi.getWishlist.method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                setWishlist(data.wishlist || []);
                setError(null);
            } else {
                setError(data.message || 'Failed to fetch wishlist.');
                toast.error(data.message || 'Failed to fetch wishlist.');
                setWishlist([]);
            }
        } catch (err) {
            setError('An error occurred while fetching wishlist.');
            toast.error('An error occurred while fetching wishlist.');
            setWishlist([]);
        } finally {
            setLoading(false);
        }
    }, [userDetails?._id]);

    useEffect(() => {
        if (userDetails?._id) { // Only fetch if user is logged in
            fetchWishlist();
        } else {
            // If user is not logged in, don't attempt to fetch.
            // A protected route would redirect them, or UI should show login prompt.
            setLoading(false);
            // Optionally, set an error or specific message for non-logged-in users
            // setError("Please log in to see your wishlist."); 
        }
    }, [userDetails?._id, fetchWishlist]);

    const handleRemoveFromWishlist = async (movieId) => {
        if (!movieId) {
            toast.error("Invalid movie ID.");
            return;
        }
        try {
            const response = await fetch(SummaryApi.wishlistRemove.url, {
                method: SummaryApi.wishlistRemove.method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ movieId }),
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message || 'Movie removed from wishlist!');
                setWishlist(prevWishlist => prevWishlist.filter(movie => movie.id !== movieId));
            } else {
                toast.error(data.message || 'Failed to remove movie from wishlist.');
            }
        } catch (err) {
            toast.error('An error occurred. Please try again.');
        }
    };

    if (!userDetails?._id) {
        return (
            <div className={styles.wishlistContainer}>
                <div className={styles.emptyWishlist}>
                    <h2>Please log in to view your wishlist.</h2>
                    <p>You can log in or create an account to start adding movies!</p>
                    <Link to="/login" className={styles.actionButton}>Login</Link> 
                    {/* Assuming /login is your login route */}
                </div>
            </div>
        );
    }

    if (loading) {
        return <div className={styles.loading}>Loading wishlist...</div>;
    }

    if (error) {
        // Display error message, but still within the main page structure
        // return <div className={styles.error}>Error: {error}</div>; 
        // This might be too abrupt. Let's integrate it into the page.
    }


    return (
        <div className={styles.wishlistContainer}>
            <h1>My Wishlist</h1>
            {error && <p className={styles.errorMessage}>{error}</p>}
            {wishlist.length === 0 && !loading && !error && (
                <div className={styles.emptyWishlist}>
                    <p>Your wishlist is empty.</p>
                    <Link to="/" className={styles.actionButton}>Browse Movies</Link>
                </div>
            )}
            {wishlist.length > 0 && (
                <div className={styles.wishlistGrid}>
                    {wishlist.map(movie => (
                        <div key={movie.id || movie._id} className={styles.movieCard}>
                            <img
                                loading="lazy" 
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                alt={movie.title} 
                                className={styles.moviePoster} 
                            />
                            <div className={styles.movieInfo}>
                                <h3 className={styles.movieTitle}>{movie.title}</h3>
                                <button 
                                    onClick={() => handleRemoveFromWishlist(movie.id)}
                                    className={styles.removeButton}
                                    aria-label="Remove from wishlist"
                                >
                                    <FaTrash /> Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
