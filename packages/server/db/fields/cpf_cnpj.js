testaCPF = (strCPF) => {
    var Soma;
    var Resto;
    Soma = 0;   
    //strCPF  = RetiraCaracteresInvalidos(strCPF,11);
    if (strCPF == "00000000000")
	return false;
    for (i=1; i<=9; i++)
	Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i); 
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11)) 
	Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) )
	return false;
	Soma = 0;
    for (i = 1; i <= 10; i++)
       Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11)) 
	Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) )
        return false;
    return true;
}

function removeMask(cpf_cnpj) {
	return cpf_cnpj.replace(".", "")
	    .replace("-", "")
	    .replace("/", "")
	    .replace("/", "");
}

module.exports = {
    type: String,
    required: [true, 'CPF/CNPJ não informado!'],
    unique: [true, 'CPF/CNPJ já existente!'],
    set: removeMask,
    validate: {
        validator: cpf_cnpj=>{

        },
        message: 'CPF/CNPJ inválido!'
    }
}