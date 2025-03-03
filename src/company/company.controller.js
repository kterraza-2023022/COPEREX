import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Company from "./company.model.js"

export const addCompany = async (req, res)=>{
    try{
        let data = req.body 
        let company = new Company(data)
        
        await company.save()

        return res.send({message: `Registered successfully, name of company: ${company.name}`})


    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with company resgistration', err})
    }
}

export const getCompanies = async(req, res)=>{
    try{
       
        const { limit = 20, skip = 0 } = req.query
        
        const companies = await Company.find()
            .skip(skip)
            .limit(limit)
            
        if(companies.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Companies not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Companies found:', 
                companies
            }   
        )
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error',err})
    }
}

export const getByYears = async (req, res) => {
    try {
        const { years } = req.query
        const companies = await Company.find({ yearsTravel: years })
        res.status(200).send(companies)
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error', err })
    }
}


export const getByCategory = async (req, res) => {
    try {
        const { category } = req.query
        const companies = await Company.find({ category })
        res.status(200).send(companies)
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error', err })
    }
}

export const getAZ = async (req, res) => {
    try {
        const companies = await Company.find().sort({ name: 1 }) // 1 para A-Z
        res.status(200).send(companies)
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error', err })
    }
}

export const getZA = async (req, res) => {
    try {
        const companies = await Company.find().sort({ name: -1 }) // -1 para Z-A
        res.status(200).send(companies)
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error', err })
    }
}


export const updCompany = async (req, res) => {
    try{
        const{id} = req.params
        const data = req.body

        const update = await Company.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
        if(!update) return res.status(404).send(
            {
                success: false,
                message: 'Company not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Company updated',
                company: update
            }
        )

    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error', err})
    }
}



//sinceramente, me siento orgulloso que me saliera esto, ya pensaba entregarlo sin esto, estuve cerca de rendirme


export const generateReport = async (req, res) => {
    try {
        // Obtener todas las empresas desde la base de datos
        const companies = await Company.find();
        console.log(`Total companies found: ${companies.length}`);

        if (!companies || companies.length === 0) {
            return res.status(404).send('No companies found');
        }

        // Crear un nuevo libro de trabajo en Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Companies Report');

        // Definir las columnas del reporte
        worksheet.columns = [
            { header: 'Company Name', key: 'name', width: 30 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Impact Level', key: 'nivelImpact', width: 20 },
            { header: 'Years of Trajectory', key: 'yearsTravel', width: 20 },
            { header: 'Category', key: 'category', width: 20 },
            { header: 'Phone', key: 'phone', width: 20 }
        ];

        // Llenar el reporte con los datos de las empresas
        companies.forEach((company) => {
            worksheet.addRow({
                name: company.name,
                email: company.email,
                nivelImpact: company.nivelImpact,
                yearsTravel: company.yearsTravel,
                category: company.category,
                phone: company.phone
            });
        });

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        
        const reportsDir = path.join(__dirname, '../reports');

       
        const filePath = path.join(reportsDir, 'companies_report.xlsx');
        console.log(`Report will be saved to: ${filePath}`);

        await workbook.xlsx.writeFile(filePath);

        if (!fs.existsSync(filePath)) {
            console.error('File not found after creation!');
            return res.status(500).send('Error generating the Excel file');
        }


        console.log('File generated successfully!');

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=companies_report.xlsx');
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error sending the file:', err);
                return res.status(500).send('Error sending the report');
            }

            /* // Eliminar el archivo temporal después de enviarlo
            fs.unlinkSync(filePath); */
        });

    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Error generating the report', err});
    }
};
