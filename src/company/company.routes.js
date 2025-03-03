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


api.get('/filter/years', getByYears)


api.get('/filter/category', getByCategory)


api.get('/az', getAZ)

api.get('/za', getZA)

api.put('/:id', [validateJwt,isAdmin, updateCompany], updCompany)

api.get('/generate-report', [validateJwt, isAdmin], generateReport)


export default api

