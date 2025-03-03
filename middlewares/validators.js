//Validar campos en las rutas
import { body } from "express-validator"
import { validateErrors } from "./validate.errors.js"
import { existEmail, existName, existPhone } from "../utils/db.validators.js"




export const registerCompany = [
    body('name', 'Name cannot be empty')
        .notEmpty()
        .custom(existName),
    body('email', 'Email cannot be empty')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('phone', 'Phone cannot be empty')
        .notEmpty()
        .custom(existPhone),
    validateErrors
]


export const updateCompany = [
    body('name')
        .optional() //Parámetro opcional, puede llegar como no puede llegar
        .notEmpty()
        .toLowerCase()
        .custom((name, { req })=> existName(name, req.company)),
    body('email')
        .optional()
        .notEmpty()
        .isEmail()
        .custom((email, {req})=> existEmail(email, req.company))
     
]

