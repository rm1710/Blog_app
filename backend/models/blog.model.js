import mongoose from "mongoose";
import validator from "validator";

const blogSchema= new mongoose.Schema(
    {
        title:{
            type:String,
            required: true
        },
        blogImage:{
            public_id:{
                type:String,  
                required:true,  
            },
            url:{
                type:String,
                required:true,
            }
        },
        category:{
            type:String,
            required:true
        },
        about:{
            type:String,
            required:true,
            email:[200,"Should contain atleast 200 cahracter"],
        },
        adminName:{
            type:String,
            
        },
        adminPhoto:{
            type:String,
            
        },
        createdBy:{
            type:mongoose.Schema.ObjectId,
            ref:"User"
        },
    }
)

export const Blog= mongoose.model('Blog',blogSchema)