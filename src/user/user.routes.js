import { Router } from "express"
import { 
    getAll, 
    get
} from "./user.controller.js"

const api = Router()

//Rutas privadas (Solo puede acceder si está logeado)
api.get(
    '/', 
    getAll
)
api.get(
    '/:id', 
    get
)


export default api