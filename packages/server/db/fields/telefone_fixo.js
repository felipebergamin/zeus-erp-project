module.exports = {
    type: String,
    set: require('../setters/setCelular') // usa o mesmo setter de celular, pois ele só remove parênteses e traços
}