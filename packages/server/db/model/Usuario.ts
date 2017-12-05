import { model } from 'mongoose';
import schema = require('../schema/UsuarioSchema');

export = model('Usuario', schema);
