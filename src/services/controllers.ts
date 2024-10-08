import { Model } from 'mongoose';

//? Obtener todos los elementos
export const getAll = async <T>(model: Model<T>): Promise<T[]> => {
    return await model.find();
};

//? Obtener un elemento por ID
export const getById = async <T>(model: Model<T>, id: string): Promise<T | null> => {
    return await model.findById(id);
};

//? Crear un nuevo elemento
export const create = async <T extends Document>(model: Model<T>, newItemData: T): Promise<T> => {
    const newItem = new model(newItemData);
    return await newItem.save();
};

//? Actualizar un elemento existente
export const update = async <T>(
    model: Model<T>,
    id: string,
    updatedData: Partial<T>
): Promise<T | null> => {
    return await model.findByIdAndUpdate(id, updatedData, { new: true });
};

//? Eliminar un elemento
export const remove = async <T>(model: Model<T>, id: string): Promise<boolean> => {
    const result = await model.findByIdAndDelete(id);
    return result !== null;
};