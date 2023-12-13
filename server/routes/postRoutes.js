import express from "express";
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key:  process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET, 
  });


// Get All posts
router.route('/').get( async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({ sucess: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
})


// create  post
router.route('/').post( async (req, res) => {
    try {
        const { name, prompt, photo } = req.body
        const photoUrl = await cloudinary.uploader.upload(photo);

        const newpost = new Post ({
            name,
            prompt,
            photo: photoUrl.url
        });
        await newpost.save();

        res.status(201).json({ sucess: true, data: newpost})
    } catch (error) {
        res.status(500).json( {sucess: false, message: error.message })
    }
})

export default router;