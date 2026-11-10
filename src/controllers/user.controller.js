import { asyncHandler } from "../utils/asynchandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";



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
    const existedUser = User.findOne({
        $and: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User Already Exist")
    }
    // check for avatar and cover image
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required")
    }
    // upload them to cloudinary

    const avatarUpload = await uploadOnCloudinary(avatarLocalPath)
    const coverImageUpload = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatarUpload) {
        throw new ApiError(400, "Avatar file is required")
    }
    // create user object - create entry in db
    const user = await User.create({
        fullname,
        avatar: avatarUpload.url,
        coverImage: coverImageUpload.url || "",
        email,
        username: username.toLowerCase(),
        password
    })

    // remove password and tokens field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    // check for user creation 
    // return res
    return res.status(200).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )
})

export { registerUser }