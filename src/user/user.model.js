import {Schema, model} from 'mongoose'

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    surname: {
        type: String,
        required: [true, 'Surname is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username is alredy taken'],
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is alredy taken']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be 8 characters']
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        minLength: [8, 'Phone must be 8 characters'],
        maxLength: [8, 'Phone must be 8 characters'],
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['ADMIN']
    }

},
{
    versionKey: false,
    timestamps: true
}
)

export default model('User', userSchema)