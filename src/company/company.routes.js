import { Router } from "express"
import { 
    addCompany,
    getCompanies,
    getByYears,
    getByCategory,
    getAZ,
    getZA,
    updCompany,
    generateReport
} from "./company.controller.js"
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js"
import { registerCompany, updateCompany } from "../../middlewares/validators.js"

const api = Router()


api.post('/',[validateJwt, isAdmin, registerCompany], addCompany)

api.get('/',getCompanies)

// 🔹 Filtrar por años de trayectoria
api.get('/filter/years', getByYears)

// 🔹 Filtrar por categoría
api.get('/filter/category', getByCategory)

// 🔹 Ordenar por nombre (A-Z o Z-A)
api.get('/az', getAZ)

api.get('/za', getZA)

api.put('/:id', [validateJwt,isAdmin, updateCompany], updCompany)

api.get('/generate-report', [validateJwt, isAdmin], generateReport)


export default api

