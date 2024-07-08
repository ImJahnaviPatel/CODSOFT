let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

const display = document.getElementById('result');
const history = document.getElementById('history');

function updateDisplay() {
    display.textContent = displayValue;
}

function inputDigit(digit) {
    if (waitingForSecondOperand) {
        displayValue = digit;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
    history.textContent = `${firstOperand} ${operator}`;
}

function calculate(first, second, op) {
    switch (op) {
        case '+': return first + second;
        case '-': return first - second;
        case '×': return first * second;
        case '÷': return first / second;
        case '%': return (first / 100) * second;
        case '√': return Math.sqrt(first);
        default: return second;
    }
}

function resetCalculator() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    history.textContent = '';
}

function handleBackspace() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = '0';
    }
}

document.querySelector('.calculator').addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) return;

    if (target.classList.contains('operator')) {
        handleOperator(target.textContent);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal();
        updateDisplay();
        return;
    }

    if (target.classList.contains('clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    if (target.classList.contains('equals')) {
        handleOperator('=');
        updateDisplay();
        history.textContent = '';
        return;
    }

    if (target.dataset.action === 'backspace') {
        handleBackspace();
        updateDisplay();
        return;
    }

    if (target.dataset.action === 'sqrt') {
        handleOperator('√');
        updateDisplay();
        return;
    }

    inputDigit(target.textContent);
    updateDisplay();
});

updateDisplay();