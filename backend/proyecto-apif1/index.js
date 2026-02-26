import express from 'express';
import cors from 'cors';
import currentDriversRouter from './routes/currentDrivers.js'
import currentTeamsRouter from './routes/currentTeams.js'
import circuitsRouter from './routes/circuitsRouter.js'

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/pilotos", currentDriversRouter)
app.use("/api/equipos", currentTeamsRouter)
app.use("/api/circuitos", circuitsRouter)


app.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000")
});
