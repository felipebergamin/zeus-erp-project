module.exports = cpf_cnpj=>{
	return cpf_cnpj.replace(/\./g, "")
	    .replace(/-/g, "")
	    .replace(/\//g, "");
}