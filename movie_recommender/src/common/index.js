const backendDomain = "http://localhost:7070"

// contains structured API endpoints and configurations for the frontend to interact with the backend
const SummaryApi ={
    signUP :{
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    signIn :{
        url : `${backendDomain}/api/signin`,
        method : "post"
    },
    current_user :{
        url: `${backendDomain}/api/user-details`,
        method : "get"
    },
    logout_user :{
        url:`${backendDomain}/api/userLogout`,
        method : "get"
    },
    wishlistAdd: {
        url: `${backendDomain}/api/wishlist/add`,
        method: 'post'
    },
    wishlistRemove: {
        url: `${backendDomain}/api/wishlist/remove`,
        method: 'post'
    },
    getWishlist: {
        url: `${backendDomain}/api/wishlist`,
        method: 'get'
    }
}

export default SummaryApi