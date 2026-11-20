// =========================================================
// OPÇÃO B: Alternador de Tema (Modo Claro / Modo Escuro)
// =========================================================
const btnTema = document.querySelector('#btn-tema');

if (btnTema) {
  btnTema.addEventListener('click', () => {
    // Adiciona ou remove a classe 'dark-mode' no <body>
    document.body.classList.toggle('dark-mode');

    // Muda o texto do botão conforme o tema atual
    if (document.body.classList.contains('dark-mode')) {
      btnTema.textContent = 'Modo Claro';
    } else {
      btnTema.textContent = 'Modo Escuro';
    }
  });
}

// =========================================================
// OPÇÃO A: Alerta Dinâmico no Carrinho / Compra
// =========================================================
const botoesComprar = document.querySelectorAll('.btn-comprar');
const avisoCompra = document.querySelector('#aviso-compra');

botoesComprar.forEach((botao) => {
  botao.addEventListener('click', (event) => {
    // Pega o card onde o botão foi clicado e busca o nome do produto
    const card = event.target.closest('.produto-card');
    const nomeProduto = card.querySelector('.produto-nome').textContent;

    if (avisoCompra) {
      avisoCompra.textContent = `Você selecionou o produto: ${nomeProduto}!`;
      avisoCompra.className = 'aviso-ativo';
    }
  });
});

// =========================================================
// OPÇÃO C: Simulador Interativo de Cálculo de Frete
// =========================================================
const btnFrete = document.querySelector('#btn-frete');
const inputCep = document.querySelector('#cep');
const resultadoFrete = document.querySelector('#resultado-frete');

if (btnFrete && inputCep && resultadoFrete) {
  btnFrete.addEventListener('click', () => {
    // Remove tudo que não for número
    const cepNumeros = inputCep.value.replace(/\D/g, '');

    if (cepNumeros.length !== 8) {
      resultadoFrete.textContent = 'Digite um CEP válido com 8 números.';
      resultadoFrete.className = 'texto-erro';
      return;
    }

    // Simula valor e prazo com base no primeiro número do CEP
    const primeiroDigito = Number(cepNumeros[0]);
    let valor = 19.90;
    let dias = 4;

    if (primeiroDigito > 4) {
      valor = 29.90;
      dias = 7;
    }

    resultadoFrete.textContent = `Frete: R$ ${valor.toFixed(2).replace('.', ',')} — Prazo de entrega: ${dias} dias úteis.`;
    resultadoFrete.className = 'texto-sucesso';
  });
}

// =========================================================
// ITEM 3: Validação Dinâmica de Formulários (preventDefault)
// =========================================================
const formCheckout = document.querySelector('#form-checkout');
const mensagemFormulario = document.querySelector('#mensagem-formulario');

if (formCheckout) {
  formCheckout.addEventListener('submit', (event) => {
    // Impede o envio padrão e o recarregamento da página
    event.preventDefault();

    const inputNome = document.querySelector('#nome');
    const inputEmail = document.querySelector('#email');
    const inputSenha = document.querySelector('#senha');

    // Limpa erros visuais anteriores
    inputNome.classList.remove('campo-erro');
    inputEmail.classList.remove('campo-erro');
    inputSenha.classList.remove('campo-erro');
    mensagemFormulario.textContent = '';
    mensagemFormulario.className = '';

    let formularioValido = true;
    let listaErros = [];

    // 1. Valida campo Nome obrigatório
    if (inputNome.value.trim() === '') {
      inputNome.classList.add('campo-erro');
      listaErros.push('Preencha o seu nome.');
      formularioValido = false;
    }

    // 2. Valida campo E-mail obrigatório
    const emailTexto = inputEmail.value.trim();
    if (emailTexto === '' || !emailTexto.includes('@')) {
      inputEmail.classList.add('campo-erro');
      listaErros.push('Informe um e-mail válido.');
      formularioValido = false;
    }

    // 3. Valida Senha com mínimo de 6 caracteres
    if (inputSenha.value.length < 6) {
      inputSenha.classList.add('campo-erro');
      listaErros.push('A senha precisa ter pelo menos 6 caracteres.');
      formularioValido = false;
    }

    // Exibe o resultado final na tela
    if (!formularioValido) {
      mensagemFormulario.textContent = listaErros.join(' ');
      mensagemFormulario.className = 'texto-erro';
    } else {
      mensagemFormulario.textContent = `Sucesso! Cadastro e pedido de ${inputNome.value.trim()} confirmados.`;
      mensagemFormulario.className = 'texto-sucesso';
      formCheckout.reset();
      if (resultadoFrete) resultadoFrete.textContent = '';
    }
  });
}
