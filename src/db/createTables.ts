import { createContactTable } from './tables/contactTable';
import { createRoomTable } from './tables/roomTable';

//! USAR node dist/src/database/createTables.js UNA VEZ PARA
//! CREAR LAS TABLAS EN LA BASE DE DATOS


const createTables = async () => {
  try {
    await createContactTable();
    console.log('Tabla Contact creada correctamente');

    await createRoomTable();
    console.log('Tabla Room creada correctamente');
  } catch (error) {
    console.error('Error al crear las tablas:', error);
  }
};

createTables();

