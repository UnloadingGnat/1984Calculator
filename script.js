/** 1984 Calculator */

const display = document.querySelector('#display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator')
const equal = document.querySelector('.equal');
const decimal = document.querySelector(".decimal");
const clear = document.querySelector('.clear')
const sign = document.querySelector('.sign');
const percent = document.querySelector('.percent')

let displayValue = ""

let equation = [];

window.addEventListener('keydown', (e) => {
    const key = document.querySelector(`[data-key="${e.key}"]`)
    key.click();
});

clear.addEventListener('click', () => {
    displayValue = "";
    updateDisplay("");
    equation = [];
});

percent.addEventListener('click', () => {
    console.log('test');
    displayValue = (displayValue / 100).toString();
    updateDisplay("");
});

sign.addEventListener('click', () => {
    if (!displayValue.includes("-") && displayValue.length > 0) {
        displayValue = "-" + displayValue;
        updateDisplay("");
    } else {
        displayValue = displayValue.slice(1);
        updateDisplay("");
    }
});

equal.addEventListener('click', () => {
    if (equation.length === 2) {
        equation.push(parseFloat(displayValue));
        displayValue = "";
        updateDisplay("");
        updateDisplay(operate(...equation));
        console.log(equation);
        equation = [];
    }
});

operators.forEach((op) => {
    op.addEventListener('click', () => {
        if (equation.length < 2 && displayValue.length > 0) {
            equation.push(parseFloat(displayValue))
            equation.push(op.value);
            displayValue = "";
            updateDisplay("");
        } else if (equation.length === 2) {
            equation.splice(-1, 1, op.value);
        }
    });
})

function updateDisplay(text) {
    if (displayValue.length < 11) {
        displayValue = displayValue + text
        if (displayValue.length > 11) {
            display.textContent = parseFloat(displayValue).toExponential(5);
        } else {
            if (displayValue == 1984) {
                display.textContent = "Literally " + displayValue;
            } else {
                display.textContent = displayValue;
            }
        }
    }
}

decimal.addEventListener('click', () => {
    if (!displayValue.includes('.')) {
        updateDisplay('.')
    }
});

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        updateDisplay(number.value);
    })
});

function operate(a, operator, b) {
    let result = 0;
    switch (operator) {
        case '+':
            if (a == 2 && b == 2) {
                result = 5;
            } else {
                result = a + b;
            }
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            if (b == 0) {
                result = "Error: 101"
            } else {
                result = a / b;
            }
            break;
        default:
            result = "Error: 101"
            break;
    }
    return result;
}

