import set = require('../setters/setRgIe');

export = {
  required: [true, 'O RG/IE não foi informado!'],
  set,
  type: String,
};
