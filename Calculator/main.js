window.onload = function () {

    const updateDisplay = () => {
        const display = document.querySelector('.calculator__display');
        display.value = model.displayValue;
    };
    updateDisplay();

    const keys = document.querySelector('.calculator__row');
    keys.addEventListener('click', (event) => {
        const {target} = event;
        if (!target.matches('button')) {
            return;
        }
        if (target.classList.contains('operator')) {
            model.handleOperator(target.value);
            updateDisplay();
            return;
        }
        if (target.classList.contains('decimal')) {
            model.inputDecimal(target.value);
            updateDisplay();
            return;
        }
        if (target.classList.contains('calculator__clear')) {
            model.resetCalculator();
            updateDisplay();
            return;
        }
        if (target.classList.contains('digit')) {
            model.inputDigit(target.value);
            updateDisplay();
            return;
        }
        if (target.classList.contains('equal-sign')) {
            model.handleOperator(target.value);
            updateDisplay();
            return;
        }
    });

};