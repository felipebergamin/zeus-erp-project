const set = require('../setters/setRgIe');

module.exports = {
  type: String,
  required: [true, 'O RG/IE não foi informado!'],
  set,
};
