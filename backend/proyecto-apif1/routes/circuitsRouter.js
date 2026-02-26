import express from 'express';
import axios from 'axios';
const router = express.Router();
const URL = 'https://f1api.dev/api/circuits'

router.get("/", async (req, res) => {
    try {
        const response = await axios.get(URL);
        res.json({
            status: 200,
            data: response.data
        })
        
    } catch (error) {
        console.log("Error no se pudieron obtener los circuitos")
        res.json({
            status: 500,
            message: "No se pudieron obtener los circuitos"
        })
    }
})

//Get filtrando por CircuitId, Country y City. Solucion ChatGpt
router.get("/search", async (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({
            status: 400,
            message: "No se ingresó parámetro de búsqueda"
        });
    }

    const URLFinal = `${URL}/search?q=${encodeURIComponent(q)}`;

    try {
        const response = await axios.get(URLFinal);
        return res.json({
            status: 200,
            data: response.data
        });
    } catch (error) {
        console.error(error.response?.data || error.message);
        return res.status(500).json({
            status: 500,
            message: "No se pudieron obtener los circuitos"
        });
    }
});


export default router;