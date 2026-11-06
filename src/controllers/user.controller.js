import { asyncHandler } from "../utils/asynchandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";



const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    const { username, email, fullname, password } = req.body
    console.log(username, email, fullname, password)
    // validation of all posible input 
    // validation = not empty
    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    // check if user alredy is not registered?
    // check username and email 
    // check for avatar and cover image
    // upload them to cloudinary
    // create user object - create entry in db
    // remove password and tokens field from response
    // check for user creation 
    // return res
    res.status(200).json({
        username,
        message: "OK"
    })
})

export { registerUser }