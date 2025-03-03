import { Router } from "express"
import { 
    getAll, 
    get
} from "./user.controller.js"

const api = Router()


api.get(
    '/', 
    getAll
)
api.get(
    '/:id', 
    get
)


export default api
