import express from "express";
import { check } from "express-validator";

import {getUsers,
        signUp,
        logIn} from '../controllers/users-controller.js'

const router = express.Router();

router.get('/', getUsers);

router.post('/signup', 
    [
        check('name').not().isEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({min: 6})
    ],
    signUp
);

router.post('/login', 
    [
        check('email').normalizeEmail().isEmail(),
        check('password').not().isEmpty(),
    ],
    logIn
);


export default router;