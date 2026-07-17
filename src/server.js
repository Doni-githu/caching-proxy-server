import express, { json } from "express"
import redis from "./redis.js"
import axios from "axios";


const app = express()


export default function CachingProxyServer(port, origin) {


    const handlerRequest = async (req, res, next) => {
        const url = `${origin.replace(/\/+$/, '')}/${req.originalUrl.replace(/^\/+/, '')}`;
        console.log(url)

        const data = await redis.get(url)
        if (data) {
            res.setHeader("X-Cache", 'HIT')
            console.log()
            return res.status(200).json(JSON.parse(data))
        }

        try {
            const { data, status } = await axios.get(url)
            redis.setex(url,60*15 ,JSON.stringify(data))
            res.setHeader('X-Cache', 'MISS')
            res.status(status).json(data)
        } catch (error) {
            console.log("Error in getting data from server")
        }

    }

    const startServer = () => {
        app.use(handlerRequest);
        app.listen(Number(port), () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    };


    return {
        startServer,
        handlerRequest
    }
}