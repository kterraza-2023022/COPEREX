import {Schema, model} from 'mongoose'

const CompanySchema = Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique: [true, 'Name is alredy taken']
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, 'Email is alredy taken']
    },
    nivelImpact: {
        type: String,
        required: [true, "The level of impact is required "],
    },
    yearsTravel: {
        type: Number,
        required: [true, "Trayectory is required"],
    },
    category: {
        type: String,
        required: [true, "The category is required"],
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
        unique: [true, 'Phone is alredy taken']
    },
},
{
    versionKey: false,
    timestamps: true
}
)

export default model('Company', CompanySchema);