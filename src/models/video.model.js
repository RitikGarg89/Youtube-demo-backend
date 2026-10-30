import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
    videoFile: {
        type: String,
        require: true,
    },
    thumbnail: {
        type: String,
        require: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    duration: {
        type: Number,
        require: true
    },
    views: {
        type: Number,
        require: true,
        default: 0
    },
    isPublished: {
        type: Boolean,
        require: true,
        default: true
    }
}, { timestamps: true })

export const video = mongoose.model("Video", videoSchema)