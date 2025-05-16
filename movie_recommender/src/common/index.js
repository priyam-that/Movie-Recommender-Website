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
    }
}

export default SummaryApi