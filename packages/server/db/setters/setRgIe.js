module.exports = rgie=>{
    return rgie.replace(/\./g, '')
        .replace(/-/g, '');
}