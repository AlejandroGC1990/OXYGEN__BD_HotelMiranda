import { Request, Response } from "express";
import { User } from "../interfaces/user";
import {getAll, getById, create, update, remove } from '../utils/controllers';

//? Ruta al JSON de users
const usersFilePath = '../data/users.json';
