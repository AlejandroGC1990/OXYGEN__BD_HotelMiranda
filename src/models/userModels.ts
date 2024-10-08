import { Schema, model, Model } from 'mongoose';
import { User } from '../interfaces/user';

//? Esquema de User
const UserSchema: Schema = new Schema({
    user_id: { 
        type: Number, 
        required: [true, 'User ID is required'], 
        unique: true 
    },
    user_name: { 
        type: String, 
        required: [true, 'User name is required'] 
    },
    user_password: { 
        type: String, 
        required: [true, 'User password is required'] 
    },
    user_picture: { 
        type: String, 
        required: [false, 'User picture can be empty'] 
    },
    user_joined: { 
        type: String, 
        required: [true, 'Join date is required'] 
    },
    user_jobDescription: { 
        type: String, 
        required: [true, 'Job description is required'] 
    },
    user_schedule: { 
        type: [String], 
        required: [true, 'User schedule is required'] 
    },
    user_contact: { 
        type: String, 
        required: [true, 'Contact information is required'] 
    },
    user_status: { 
        type: String, 
        required: [true, 'User status is required'] 
    }
});

//? Crear el modelo 'User'
const UserModel: Model<User> = model<User>('User', UserSchema);

export default UserModel;
