import * as fs from 'fs';
import path from 'path';

//? Función para leer datos desde un archivo JSON
const readDataFromFile = <T>(filePath: string): T[] => {
    const absolutePath = path.join(__dirname, filePath);
    const data = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(data) as T[];
};

//? Función para escribir datos en un archivo JSON
const writeDataToFile = <T>(filePath: string, data: T[]): void => {
    const absolutePath = path.join(__dirname, filePath);
    fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2), 'utf-8');
};

//? Obtener todos los elementos (ej: rooms, users)
export const getAll = <T>(filePath: string): T[] => {
    return readDataFromFile<T>(filePath);
};

//? Obtener un elemento por ID
export const getById = <T>(filePath: string, idKey: keyof T, idValue: number): T | undefined => {
    const items = readDataFromFile<T>(filePath);
    return items.find(item => item[idKey] === idValue);
};

//? Crear un nuevo elemento
export const create = <T>(filePath: string, newItem: T, idKey: keyof T): T => {
    const items = readDataFromFile<T>(filePath);
    const newId = items.length > 0 ? (items[items.length - 1][idKey] as unknown as number) + 1 : 1;
    const newItemWithId = { ...newItem, [idKey]: newId };
    items.push(newItemWithId);
    writeDataToFile(filePath, items);
    return newItemWithId;
};

//? Modificar un elemento existente
export const update = <T>(filePath: string, idKey: keyof T, idValue: number, updatedData: Partial<T>): T | undefined => {
    const items = readDataFromFile<T>(filePath);
    const index = items.findIndex(item => item[idKey] === idValue);
    if (index !== -1) {
        const updatedItem = { ...items[index], ...updatedData };
        items[index] = updatedItem;
        writeDataToFile(filePath, items);
        return updatedItem;
    }
    return undefined;
};

//? Eliminar un elemento
export const remove = <T>(filePath: string, idKey: keyof T, idValue: number): boolean => {
    let items = readDataFromFile<T>(filePath);
    const initialLength = items.length;
    items = items.filter(item => item[idKey] !== idValue);
    if (items.length < initialLength) {
        writeDataToFile(filePath, items);
        return true;
    }
    return false;
};
