import express from "express";
import bodyParser from "body-parser";

import placesRoutes from './routes/places-routes.js';
import usersRotes from './routes/users-routes.js'


const port = 5000; 
const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRoutes);

app.use('/api/users', usersRotes);


app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }else {
        res.status(error.code || 500);
        res.json({mensaje: error.message || 'Ocurrio un error desconocido'})
    }
})


app.listen(port);