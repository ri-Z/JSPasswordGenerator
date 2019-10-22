//DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}


// copy to clipboard
clipboard.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = resultEl.innerText;
	
	if(!password) { return; }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
});


//generate event listener
generateEl.addEventListener('click', () => {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;
	
	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});


//generate password function
function generatePassword(lower, upper, number, symbol, length){
    // 1. Init pw var
    // 2. Filter out unchecked types
    // 3. Loop over length and call generator function for each type
    // 4. Add final pw to the pw var and return

    let generatedPassword = '';
    
    const typesCount = lower + upper + number + symbol;
    //console.log('typesCount: ', typesCount);
    
    const typesArray = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
    //console.log('typesArray: ', typesArray);

    if(typesCount === 0)
    {
        return '';
    }

    // console.log('before for');
    for(let i = 0; i < length; i += typesCount) {
        //console.log('for');
		typesArray.forEach(type => {
            const funcName = Object.keys(type)[0];
            //console.log('funcName:', funcName);

			generatedPassword += randomFunc[funcName]();
		});
	}

    //console.log(generatedPassword);
    
    const finalPassword = generatedPassword.slice(0, length); // if length is 1 only gives slices because everything might be true in order to only give one char
	
	return finalPassword;
}


// Generator functions - http://www.net-comber.com/charset.html
function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol(){
    const symbols = '!@#$%^&*()_+-=;":[]{},./<>?|`~';
    //const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// console.log(getRandomLower());
// console.log(getRandomUpper());
// console.log(getRandomNumber());
// console.log(getRandomSymbol());


// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible')
});