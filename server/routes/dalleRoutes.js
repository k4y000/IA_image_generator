import express from "express";
import * as dotenv from 'dotenv';
import OpenAi from 'openai';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

const openai = new OpenAi();

router.route('/').get((req, res) => {
    res.send('Hello from Dall-E')
})

router.route('/').post( async (req, res) => {
    try {
        const {prompt} = req.body;

        const aiResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        const image = aiResponse.data[0].b64_json;

        res.status(200).json({ photo: image});

    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response?.data?.error?.message)
    }
} )

export default router;