module.exports = numero=>{
    return numero.replace(/\(/g, '')
        .replace(/\)/g)
        .replace(/-/g);
}