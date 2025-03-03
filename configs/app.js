//Levantar servidor express (HTTP)

'use strict'

//ECModules | ESModules
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/user/user.routes.js'
import companyRoutes from '../src/company/company.routes.js'
import { limiter } from '../middlewares/rate.limit.js'
import { defaultAdmin } from '../src/auth/auth.controller.js'


const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)
}

const routes = (app)=>{
    app.use(authRoutes)
    app.use('/v1/user', userRoutes)
    app.use('/v1/company', companyRoutes)
    
}
 



//Ejecutarmos el servidor
export const initServer = ()=>{
    const app = express() //Instancia de express
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
        defaultAdmin('Luciano ', 'Terraza', 'kterraza', 'kterraza@gmail.com', 'StrongPas.sword123', '12345678', 'ADMIN')
    }catch(err){
        console.error('Server init failed', err)
    }
}