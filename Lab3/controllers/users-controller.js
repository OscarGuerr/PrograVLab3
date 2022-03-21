import {v4 as uuidv4} from 'uuid';
import { validationResult } from 'express-validator';

import HttpError from '../models/http-error.js';

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Oscar Guerrero',
        email: 'ogx@correo.com',
        password: '12345'
    }
];

export const getUsers = (req, res, next) => {
    res.status(200).send({users: DUMMY_USERS});
}

export const signUp = (req, res , next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log(errors);
        return next(
            new HttpError('Los Datos Ingresados no se pueden validar', 422)
        );
    }

    const {name, email, password, creationDate} = req.body;

    const createdUser = {
        id: uuidv4(),
        name,
        email,
        password,
        creationDate
    };

    DUMMY_USERS.push(createdUser);
    res.status(201).json({user: createdUser});

}

export const logIn = (req, res, next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log(errors);
        return next(
            new HttpError('Los Datos Ingresados no se pueden validar', 422)
        );
    }else{
        const {email, password} = req.body;
        const identifyUser = DUMMY_USERS.find( u => (u.email === email));

        if((!identifyUser) || (identifyUser.password !== password)){
            return next(
                new HttpError("No se identifico al usuario, introdusca los datos de nuevo", 401)
            );
        }else {
            res.status(200).json({mensaje: 'Login Correcto'});
        }
    }
}
