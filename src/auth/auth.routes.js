//Rutas de autenticación
import { Router } from "express"
import { 
    login, 
    test 
} from "./auth.controller.js"
import { validateJwt } from '../../middlewares/validate.jwt.js'




const api = Router()

api.post('/login', login)

//Rutas privadasa
api.get('/test', [validateJwt], test)

//Exporto las rutas
export default api