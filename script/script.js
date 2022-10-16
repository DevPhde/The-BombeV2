var mensagemEntrada = document.getElementById("texto_entrada");
var mensagemSaida = document.getElementById("texto_saida");
var incremento = document.getElementById("num");

function nomeBotao() { // modifica o nome do botao ao clicar no radio
    let encripta = document.getElementById("encript");
    var btn = document.getElementById("btn")
    if (encripta.checked == true) { // AJUSTAR 
        btn.className = "btn_move"; // 
        btn.innerHTML = "Encriptar"; // 

        setTimeout(function() { //
            btn.className = "btn_unmove"; // 
          }, 1500);// 
        
       
    }
    else {
        btn.innerHTML = "Decriptar";
    }
}
function componenteUnhidden() { // FAZ APARECER O INPUT PARA PREENCHER COM O INCREMENTO DA CIFRA DE CESAR
    let cifra = document.getElementById("cifra");

    if (cifra.checked == true) {
        document.querySelector("div.component").style.visibility = "visible";
        document.querySelector("div.component").style.width = "280px";
    }
    else {
        document.querySelector("div.component").style.visibility = "hidden";
        document.querySelector("div.component").style.width = "1px";
    }
}


    
    
function botao() {
    if (mensagemEntrada.value.trim() == "") { // TESTA SE O CAMPO MENSAGEM ESTÁ VAZIO
        document.getElementById("error").innerHTML = "Preencha o campo (Mensagem)";
    }
    else {
            // CIFRA DE CESAR
        if (document.getElementById("cifra").checked) {
            cifra(mensagemEntrada, incremento, mensagemSaida); // CHAMA A FUNÇÃO PARA CRIPTOGRAFAR
            mensagemSaida.style.width = "250px"; // codigo para abrir a caixa saida
            mensagemSaida.style.height = "100px";
            mensagemSaida.style.visibility = "visible";
        }
            // BASE64
        else {
            base(mensagemEntrada, mensagemSaida);
            mensagemSaida.style.width = "250px"; // codigo para abrir a caixa saida
            mensagemSaida.style.height = "100px";
            mensagemSaida.style.visibility = "visible";
        }   
    }
}

// (CIFRA DE CESAR) - CRIPTOGRAFAR e DESCRIPTOGRAFAR

function cifra(mensagemEntrada, incremento, mensagemSaida) {
    mensagemEntrada = mensagemEntrada.value;
    incremento = incremento.value;
    var alfabeto = "abcdefghijklmnopqrstuvwxyz".split("");
    var acento = "áàãâäéèêíìîóòôõúùûüç".split("");
    var mensagemPronta = "";  // variável onde será montado a nova frase (codificada ou decodificada)
    var fraseLowerCase = mensagemEntrada.toLowerCase();

    incremento = incremento % 26;
    for (var index = 0; index < fraseLowerCase.length; index++) {
        var currentLetter = fraseLowerCase[index];

        if (currentLetter === " ") {
            mensagemPronta += currentLetter;
            continue;
        }
        // BUSCAR SOLUÇÃO MAIS EFICIENTE PARA ESSE IF.
        if (acento.includes(currentLetter) === true) { // substitui letras com acento por letras sem acento
            var currentLetter = currentLetter.replace(/[áàãâä]/i,"a");
            var currentLetter = currentLetter.replace(/[éèê]/i,"e");
            var currentLetter = currentLetter.replace(/[íìî]/i,"i"); 
            var currentLetter = currentLetter.replace(/[óòôõ]/i,"o"); 
            var currentLetter = currentLetter.replace(/[úùûü]/i,"u"); 
            var currentLetter = currentLetter.replace(/[ç]/i,"c"); 
        }
        if (alfabeto.includes(currentLetter) == false) { // caso o usuário coloque caracteres especiais ou números, os mesmos serão adicionados a variável "mensagemPronta", sem precisar passar pela tratativa da cifra de cesar.
            mensagemPronta += currentLetter;

        }
        else{
            var currentIndex = alfabeto.indexOf(currentLetter);
            if (document.getElementById("encript").checked) { // VERIFICA SE É PARA ENCRIPTAR OU DECRIPTAR O CÓDIGO
                var newIndex = parseInt(currentIndex) + parseInt(incremento); // ENCRIPTAR
            }
            else {
                var newIndex = parseInt(currentIndex) - parseInt(incremento); // DECRIPTAR
            }
            if (newIndex > 25) newIndex = parseInt(newIndex) - 26;
            if (newIndex < 0) newIndex = parseInt(newIndex) + 26;        
            if (mensagemEntrada[index] === mensagemEntrada[index].toUpperCase()){
                mensagemPronta += alfabeto[newIndex].toUpperCase();
            }
            else {
                mensagemPronta += alfabeto[newIndex];
            }
        }
        mensagemSaida.innerHTML = mensagemPronta;
    }
}

// (BASE64) CRIPTOGRAFAR e DESCRIPTOGRAFAR

function base(mensagemEntrada, mensagemSaida) {
    var mensagemEntrada = mensagemEntrada.value;
    var mensagemPronta = "";
    if (document.getElementById("encript").checked) { // VERIFICA SE É PARA ENCRIPTAR OU DECRIPTAR O CÓDIGO
        mensagemPronta = window.btoa(mensagemEntrada);
        mensagemSaida.innerHTML = mensagemPronta;
    }
    else {
        mensagemPronta = window.atob(mensagemEntrada);
        mensagemSaida.innerHTML = mensagemPronta;
    }
}



// TIRA MENSAGEM DE ERRO AO CLICAR NO TextArea "MENSAGEM"  + LIMPAR E FECHAR CAIXA DE TEXTO "SAIDA DO CODIGO PRONTO"
function reseta() {
    document.querySelector("p#error").innerHTML = "";

    // codigo para fechar a caixa de saída da mensagem
    mensagemSaida.style.width = "1px"; 
    mensagemSaida.style.height = "1px";
    mensagemSaida.style.visibility = "hidden";
    mensagemSaida.innerHTML = "";

}