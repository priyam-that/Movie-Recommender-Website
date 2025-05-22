import SummaryApi from "../common/index.js";

export const addToWishlistAPI = async (movieData) => {
  const response = await fetch(SummaryApi.wishlistAdd.url, {
    method: SummaryApi.wishlistAdd.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieData),
    credentials: 'include',
  });

  if (!response.ok) {
    console.error('Error adding to wishlist:', response.statusText);
    // You might want to throw an error here or return a specific error object
    return { error: true, message: response.statusText, status: response.status };
  }

  const data = await response.json();
  return data;
};
