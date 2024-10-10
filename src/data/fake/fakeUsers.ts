import { faker } from '@faker-js/faker'; 
import { User } from '../../interfaces/user'; // Importamos la interfaz User

//? Función que genera un usuario fake basado en la interfaz User
export const fakeUsers = (): User => {
    return {
        user_id: faker.datatype.uuid(),  
        user_name: faker.internet.userName(), 
        user_password: faker.internet.password(), 
        user_picture: faker.image.avatar(),  
        user_joined: faker.date.past().toISOString(),
        user_jobDescription: faker.name.jobTitle(),  
        user_schedule: [  
            faker.date.weekday(), 
            faker.date.weekday(), 
            faker.date.weekday()
        ], 
        user_contact: faker.phone.number(),  
        user_status: faker.helpers.arrayElement(['Active', 'Inactive']), 
    };
};