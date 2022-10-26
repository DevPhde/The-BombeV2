let messageIn = document.getElementById("text_in");
let messageOut = document.getElementById("text_out");
let increment = document.getElementById("increment");
let messageCode = document.querySelector(".text_output")


// modifica o nome do botao ao clicar no radio + animação sumir e aparecer
function buttonAnimation() {
    let encript = document.getElementById("code");
    let btn = document.getElementById("btn");
    btn.className = "btn_move";
    let innerHtmlValue = encript.checked ? "Codificar" : "Decodificar";

    setTimeout(function () {
        btn.innerHTML = innerHtmlValue;
    }, 500);
    setTimeout(function () {
        btn.className = "btn_unmove"
    }, 800);
}

// FAZ APARECER O INPUT PARA PREENCHER COM O INCREMENTO DA CIFRA DE CESAR
function componentHidden() {
    let caesar = document.getElementById("cipher");

    function querySelector(queryValue, classNameValue, isIncrementValue) {
        document.querySelector(queryValue).className = classNameValue;
        if (isIncrementValue) {
            increment.value = ""; // ZERA O INPUT "INCREMENTO"
        }
    }
    caesar.checked ? querySelector("input.input_number_hidden", "input_number_visible", true) : querySelector("input.input_number_visible", "input_number_hidden", false);
}

function btnFunction() {
    function setInnerHtml(elementById, innerHtmlValue) {
        document.getElementById(elementById).innerHTML = innerHtmlValue;
    }
    function setDecodifyAndClassName(classNameValue, isCipher) {
        isCipher ? cipher(messageIn, increment, messageOut) : base(messageIn, messageOut); 
        messageOut.className = classNameValue;
        setTimeout(outputAnimation, 500);
    }

    if (messageIn.value.trim() == "") { // TESTA SE O CAMPO "MENSAGEM" ESTÁ VAZIO
        setInnerHtml("error","Preencha o campo (Mensagem)");
    }
    else { 
        // CIFRA DE CESAR
        if (document.getElementById("cipher").checked) {
            let isEmptyValue = (increment.value == "")
            isEmptyValue ? setInnerHtml("error_increment", "Preencha com o Incremento") : setDecodifyAndClassName("move_text_out", true);
        }
        // BASE64
        else {
            setDecodifyAndClassName("move_text_out", false);
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
    let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    let accent = "áàãâäåéèêëíìîïóòôõúùûüçæñœ".split("");
    let message = "";  // variável onde será montado a nova frase (codificada ou decodificada)
    let phraseLowerCase = messageIn.toLowerCase();

    increment = increment % 26;
    for (let index = 0; index < phraseLowerCase.length; index++) {
        let currentLetter = phraseLowerCase[index];

        if (currentLetter === " ") {
            message += currentLetter;
            continue;
        }
        if (accent.includes(currentLetter)) { // substitui letras com acento por letras sem acento
            let = currentLetter;
            let non_asciis = { 'a': '[àáâãäå]', 'ae': 'æ', 'c': 'ç', 'e': '[èéêë]', 'i': '[ìíîï]', 'n': 'ñ', 'o': '[òóôõö]', 'oe': 'œ', 'u': '[ùúûűü]' };
            for (i in non_asciis) { currentLetter = currentLetter.replace(new RegExp(non_asciis[i], 'g'), i); }
        }
        if (alphabet.includes(currentLetter) == false) { // caso o usuário coloque caracteres especiais ou números, os mesmos serão adicionados a variável "message", sem precisar passar pela tratativa da cifra de cesar.
            message += currentLetter;
        }
        else {
            let currentIndex = alphabet.indexOf(currentLetter);
            // VERIFICA SE É PARA ENCRIPTAR OU DECRIPTAR O CÓDIGO 
            let checked = document.getElementById("code").checked
            let newIndex = checked ? (parseInt(currentIndex) + parseInt(increment)) : (parseInt(currentIndex) - parseInt(increment));

            if (newIndex > 25) newIndex = parseInt(newIndex) - 26;
            if (newIndex < 0) newIndex = parseInt(newIndex) + 26;

            let isMessageUpperCased = messageIn[index] === messageIn[index].toUpperCase()
            isMessageUpperCased ? message += alphabet[newIndex].toUpperCase() : message += alphabet[newIndex];
        }
        messageOut.innerHTML = message;
    }
}
// (BASE64) CRIPTOGRAFAR e DESCRIPTOGRAFAR
function base(messageIn, messageOut) {
    messageIn = messageIn.value;
    let message = "";
    let isCodeChecked = document.getElementById("code").checked

    isCodeChecked ? message = window.btoa(messageIn) : message = window.atob(messageIn); // TESTA SE IRÁ CODIFICAR OU DECODIFICAR
    messageOut.innerHTML = message;
}
// TIRA MENSAGEM DE ERRO
let text = document.getElementById("text_in");
text.addEventListener("click", (function () {
    document.getElementById("error").innerHTML = "";
    resetTarget();
}));
increment.addEventListener("click", (function () {
    document.getElementById("error_increment").innerHTML = "";
}));
// TIRA MENSAGEM DE ERRO + LIMPAR E FECHAR CAIXA DE TEXTO "SAIDA DO CODIGO PRONTO"
function resetTarget() {
    let labelCode = document.querySelector("b.b_code");

    // SOME A CAIXA DE SAÍDA DO CODIGO
    labelCode.style.transform = "translate(0, 150%)";
    labelCode.style.transition = "all 0.5s";
    labelCode.style.visibility = "hidden";
    setTimeout(function () {
        messageOut.className = "text_area_out";
    }, 500);
    messageOut.innerHTML = "";
}
// MODAL
const toggleModal = () => {
    const bodyClassList = document.body.classList;
    let isOpen = bodyClassList.contains("open");
    isOpen ? bodyClassList.remove("scrollOff", "open") : bodyClassList.add("scrollOff", "open"); 
  }
  let span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
    const bodyClassList = document.body.classList;
    bodyClassList.remove("scrollOff", "open");
}