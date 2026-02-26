import express from 'express';
import axios from 'axios';

const router = express.Router();
const URL = "https://f1api.dev/api/current/drivers";

router.get("/", async (req, res) => {
    try {
        const response = await axios.get(URL)
        res.json({
            status: 200,
            data: response.data
        }) 
    } catch (error) {
        console.log("Error al obtener")
        res.json({
            status: 500,
            message: "No se pudieron obtener los pilotos"
        })
    }

})

router.get("/:id", async (req, res) => {
    const driverId = req.params.id
    try {
        const response = await axios.get(`${URL}/${driverId}`)
        res.json({
            status: 200,
            data: response.data
        }) 
    } catch (error) {
        console.log("Error al obtener")
        res.json({
            status: 500,
            message: "No se pudieron obtener los pilotos"
        })
    }

})


export default router;