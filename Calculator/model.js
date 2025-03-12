const model = {
    displayValue: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false,
    errorOccurred: false,

    resetCalculator() {
        model.displayValue = '0';
        model.firstNumber = null;
        model.waitingForSecondNumber = false;
        model.operator = null;
        model.errorOccurred = false;
    },

    inputDigit(digit) {
        if (model.errorOccurred) return;
        if (model.waitingForSecondNumber) {
            model.displayValue = digit;
            model.waitingForSecondNumber = false;
        } else {
            if (this.imputLimitExceeded()) {
                return;
            }
            model.displayValue = model.displayValue === '0' ? digit : model.displayValue + digit;
        }
    },
    inputDecimal(dot) {
        if (model.errorOccurred ||  model.waitingForSecondNumber) return;
        if (!model.displayValue.includes(dot)) {
            model.displayValue += dot;
        }
    },

    handleOperator(nextOperator) {
        if (model.errorOccurred) return;
        const inputValue = parseFloat(model.displayValue);

        if (model.operator && model.waitingForSecondNumber) {
            model.operator = nextOperator;
            return;
        }

        if (model.firstNumber == null) {
            model.firstNumber = inputValue;
        } else if (model.operator) {
            const currentValue = model.firstNumber || 0;
            let result = this.performCalculation[model.operator](currentValue, inputValue);

            if (String(result).length > 8) {
                if (String(result).indexOf('.') < 0) {
                    model.errorOccurred = true;
                    model.displayValue = String("-1");
                    return;
                } else {
                    result = parseFloat((String(result)).substring(0, 9));
                    model.firstNumber = result;
                }
            }
            model.displayValue = String(result);
            model.firstNumber = result;
        }
        model.waitingForSecondNumber = true;
        model.operator = nextOperator;
    },

    performCalculation: {
        '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
        '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
        '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
        '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
        '=': (firstOperand, secondOperand) => secondOperand
    },

    imputLimitExceeded() {
        return this.displayValue.length >= 8 ? true : false;
    },
};
