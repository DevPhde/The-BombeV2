
let messageIn = document.getElementById("text_in");
let messageOut = document.getElementById("text_out");
let increment = document.getElementById("increment");
let messageCode = document.querySelector(".text_output")


// modifica o nome do botao ao clicar no radio + animação sumir e aparecer
function buttonAnimation() { 
    let encript = document.getElementById("code");
    let btn = document.getElementById("btn");
    
    if (encript.checked == true) {
        btn.className = "btn_move";  
        setTimeout(function() { 
            btn.innerHTML = "Codificar"
        }, 500);
        setTimeout(function() {
            btn.className = "btn_unmove"
        }, 800); 
    }
    else {
        btn.className = "btn_move";
        setTimeout(function() { 
            btn.innerHTML = "Decodificar"
        }, 500);
        setTimeout(function() {
            btn.className = "btn_unmove"
        }, 800); 
    }
}

// FAZ APARECER O INPUT PARA PREENCHER COM O INCREMENTO DA CIFRA DE CESAR
function componentHidden() { 
    let caesar = document.getElementById("cipher");

    if (caesar.checked == true) {
        document.querySelector("input.input_number_hidden").className = "input_number_visible";
        increment.value = "";
    }
    else {
        document.querySelector("input.input_number_visible").className = "input_number_hidden";
    }
}

function btnFunction() {

    if (messageIn.value.trim() == "") { // TESTA SE O CAMPO "MENSAGEM" ESTÁ VAZIO
        document.getElementById("error").innerHTML = "Preencha o campo (Mensagem)";
    }
    else {
            // CIFRA DE CESAR
        if (document.getElementById("cipher").checked) {
            if (increment.value == "") { 
                document.getElementById("error_increment").innerHTML = "Preencha com o Incremento";
            }    
            else {       
            cipher(messageIn, increment, messageOut); // CHAMA A FUNÇÃO PARA CODIFICAR/DECODIFICAR
            messageOut.className = "move_text_out";
            setTimeout(outputAnimation, 500);
            }
        }
            // BASE64
        else {
            base(messageIn, messageOut);
            messageOut.className = "move_text_out";
            setTimeout(outputAnimation, 500);
        }   
    }
}

function outputAnimation() { // animação do campo de saida da mensagem
    let labelCode = document.querySelector("b.b_code");

    labelCode.style.transform = "translate(0, -15%)";
    labelCode.style.transition = "all 0.5s";
    labelCode.style.visibility = "visible";
}

// (CIFRA DE CESAR) - CRIPTOGRAFAR e DESCRIPTOGRAFAR
function cipher(messageIn, increment, messageOut) {
    messageIn = messageIn.value;
    increment = increment.value;
    var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    var accent = "áàãâäéèêíìîóòôõúùûüç".split("");
    var message = "";  // variável onde será montado a nova frase (codificada ou decodificada)
    var fraseLowerCase = messageIn.toLowerCase();

    increment = increment % 26;
    for (var index = 0; index < fraseLowerCase.length; index++) {
        var currentLetter = fraseLowerCase[index];

        if (currentLetter === " ") {
            message += currentLetter;
            continue;
        }
        // BUSCAR SOLUÇÃO MAIS EFICIENTE PARA ESSE IF.
        if (accent.includes(currentLetter) === true) { // substitui letras com acento por letras sem acento
            var currentLetter = currentLetter.replace(/[áàãâä]/i,"a");
            var currentLetter = currentLetter.replace(/[éèê]/i,"e");
            var currentLetter = currentLetter.replace(/[íìî]/i,"i"); 
            var currentLetter = currentLetter.replace(/[óòôõ]/i,"o"); 
            var currentLetter = currentLetter.replace(/[úùûü]/i,"u"); 
            var currentLetter = currentLetter.replace(/[ç]/i,"c"); 
        }
        if (alphabet.includes(currentLetter) == false) { // caso o usuário coloque caracteres especiais ou números, os mesmos serão adicionados a variável "message", sem precisar passar pela tratativa da cifra de cesar.
        message += currentLetter;
        }
        else{
            var currentIndex = alphabet.indexOf(currentLetter);
            if (document.getElementById("code").checked) { // VERIFICA SE É PARA ENCRIPTAR OU DECRIPTAR O CÓDIGO
                var newIndex = parseInt(currentIndex) + parseInt(increment); // CODIFICAR
            }
            else {
                var newIndex = parseInt(currentIndex) - parseInt(increment); // DECODIFICAR
            }
            if (newIndex > 25) newIndex = parseInt(newIndex) - 26;
            if (newIndex < 0) newIndex = parseInt(newIndex) + 26;        
            if (messageIn[index] === messageIn[index].toUpperCase()){
                message += alphabet[newIndex].toUpperCase();
            }
            else {
                message += alphabet[newIndex];
            }
        }
        messageOut.innerHTML = message;
    }
}

// (BASE64) CRIPTOGRAFAR e DESCRIPTOGRAFAR
function base(messageIn, messageOut) {
    var messageIn = messageIn.value;
    var message = "";
    if (document.getElementById("code").checked) { // VERIFICA SE É PARA CODIFICAR OU DECODIFICAR O CÓDIGO
        message = window.btoa(messageIn);
        messageOut.innerHTML = message;
    }
    else {
        message = window.atob(messageIn);
        messageOut.innerHTML = message;
    }
}

// TIRA MENSAGEM DE ERRO
let text = document.getElementById("text_in");
text.addEventListener("click", (function(){
    document.getElementById("error").innerHTML = "";
}));
increment.addEventListener("click", (function(){
    document.getElementById("error_increment").innerHTML = "";
}));

// TIRA MENSAGEM DE ERRO + LIMPAR E FECHAR CAIXA DE TEXTO "SAIDA DO CODIGO PRONTO"
// function resetTargets() {
//     let labelCode = document.querySelector("b.b_code");

//     console.log(pe);
//     // SOME A CAIXA DE SAÍDA DO CODIGO
//     labelCode.style.transform = "translate(0, 150%)";
//     labelCode.style.transition = "all 0.5s";
//     labelCode.style.visibility = "hidden";
//     setTimeout(function() {
//             messageOut.className = "text_area_out";
//         }, 500);
//     messageOut.innerHTML = "";
// }
