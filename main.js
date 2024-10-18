'use strict'; // ativa o modo restrito

// Função para limpar os campos preenchidos
const limparFormulario = () => {
    document.getElementById('logradouro').value = ''; 
    document.getElementById('bairro').value = ''; 
    document.getElementById('localidade').value = ''; 
    document.getElementById('uf').value = ''; 
    document.getElementById('numero').value = ''; 
    document.getElementById('complemento').value = ''; 
}

// Verifica se o cep é válido
const eNumero = (numero) => /^[0-9]+$/.test(numero); 
const cepValido = (cep) => cep.length === 8 && eNumero(cep); 

// Validações
const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validarCPF = (cpf) => {
    return true;
};

// Função para preencher formulário
const preencherFormulario = (endereco) => {
    document.getElementById('logradouro').value = endereco.logradouro; 
    document.getElementById('bairro').value = endereco.bairro; 
    document.getElementById('localidade').value = endereco.localidade; 
    document.getElementById('uf').value = endereco.uf; 
}

// Função para consumo de API viaCep
async function pesquisarCep() {
    limparFormulario();
    const cep = document.getElementById('cep').value; // Captura o valor do CEP
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')) {
            alert('CEP não encontrado');
        } else {
            preencherFormulario(endereco);
        }
    } else {
        alert('CEP incorreto');
    }
}

// Adiciona o evento ao botão "Enviar"
document.getElementById('enviar').addEventListener('click', () => {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const dataNascimento = document.getElementById('dataNascimento').value;
    const cep = document.getElementById('cep').value.trim();

    // Validações
    if (!nome) {
        alert('O nome é obrigatório.');
        return;
    }

    if (!email || !validarEmail(email)) {
        alert('Email inválido.');
        return;
    }

    if (!senha) {
        alert('A senha é obrigatória.');
        return;
    }

    if (!cpf || !validarCPF(cpf)) {
        alert('CPF inválido.');
        return;
    }

    if (!dataNascimento) {
        alert('Data de nascimento é obrigatória.');
        return;
    }

    if (!cep || !cepValido(cep)) {
        alert('CEP inválido.');
        return;
    }

    alert('Dados válidos! Enviando...');
});

// Chama escutador para disparar ação de preenchimento
document.getElementById('cep').addEventListener('focusout', pesquisarCep);

