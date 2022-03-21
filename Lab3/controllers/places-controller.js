import {v4 as uuidv4} from 'uuid';

import HttpError from '../models/http-error.js';

let DUMMY_PLACES = [
    {
        idCompra: 1,
        totalCompra: 50,
        usersId: 'p1',
        fechaHoraCompra: 18/10/2021,
        detalleCompra:{
            idDetalle: 1, producto: "coca cola",
            cantidadComprada: 5,
            precioUnitario: 5,
            sub_total: 25
        },
    }
    
];

export const getPlaceById = (req, res, next) => {
    console.log("GET desde /api/places/");

    const placeId = req.params.pid;
    const place2Retrive = DUMMY_PLACES.find( p => {return p.id === placeId}); 

    if(!place2Retrive){
        return next(
            new HttpError('No se encontró el detalle de compra especificado en el pid',
            404)
        ); 
    } else {
        res.json(place2Retrive);
    }
}

export const getPlaceByUserId = (req, res, next) => {
    console.log("GET desde /api/places/user/:uid/");

    const userId = req.params.uid;
    const place2Retrive = DUMMY_PLACES.filter(p => {return p.usersId === userId});
    
    if(!place2Retrive){
        return next(
            new HttpError('No se encontraron el detalle de compra para el usuario uid',
            404)
        ); 
    } else {
        res.json(place2Retrive);
    }
}

export const createPlace = async (req, res, next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log(errors);
        return next(
            new HttpError("Los datos ingresados no son validos.", 422)
        )
    }else{
        
        const {totalCompra, usersId,
            fechaHoraCompra, detalleCompra} = req.body;

    
        const place2Create ={
            id: uuidv4(),
            totalCompra,
            usersId,
            fechaHoraCompra,
            address,
            detalleCompra
        }
    
        DUMMY_PLACES.push(place2Create);
        res.status(201).json(place2Create);
    }

    
}

export const updatePlace = (req, res, next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log(errors);
        return next(
            new HttpError("Los datos ingresados no son validos.", 422)
        )
    }

    const {totalCompra, usersId} = req.body; //datos desde el boy
    const placeId = req.params.pid; //datos desde la ruta

    const place2Update = 
    {...DUMMY_PLACES.find(p => (p.id ===placeId))};
    place2Update.totalCompra = totalCompra;
    place2Update.usersId = usersId;

    const placeIndex = DUMMY_PLACES.findIndex(p => (p.id ===placeId));
    DUMMY_PLACES[placeIndex] = place2Update;
    res.status(200).json(place2Update);
}

export const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    DUMMY_PLACES = 
        DUMMY_PLACES.filter(p => (p.id != placeId));
    res.status(200).json({mensaje: 'Compra Eliminada.'})
}