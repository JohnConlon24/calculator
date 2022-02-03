//How To Store Numbers Displayed
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
  //Different types of clickable characters 
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }
  
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
  
  appendNumber(number) {
    //Only one decimal is able to be added to display screen at a time
    if (number === '.' && this.currentOperand.includes('.')) return
    //Allows numbers to be displayed on calculator
    this.currentOperand = this.currentOperand.toString() + number.toString()
    //Converting to String b/c JS will automatically add the numbers when clicked instead of stringing them together
  }
  
  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    //Calculator knows what operation to use when computes the value
    this.operation = operation
    this.previousOperand = this.currentOperand
    //Current operand moves to previous so an operation can be added to new number now in current
    this.currentOperand = ''
  }
  
  compute() {
    //Result of compute function
    let computation
    //Number version of previous operand
    const previous = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(previous) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = previous + current
        break
      case '-':
        computation = previous - current
        break
      case '*':
        computation = previous * current
        break
      case '÷':
        computation = previous / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }
  
  //Returns number as display value
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay 
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
      maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
  
  updateDisplay() {
    //Sets the text of current number value
    this.currentOperandTextElement.innerText = 
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = 
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
      }
    }
  }
  //Variables for numbers, operations, etc...
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector ('[data-current-operation]')
  
  //Linking variables to Calculator
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  //Selects all number buttons
  numberButtons.forEach(button => {
    //Whenever we click, we add number to display screen
    button.addEventListener('click', () => {
      //Adds the number that is inside the buttton
      calculator.appendNumber(button.innerText)
      //Updates display values everytime a button is clicked on calculator
      calculator.updateDisplay()
    })
  })
  operationButtons.forEach(button => {
    //Whenever we click, we add number to display screen
    button.addEventListener('click', () => {
      //Adds the number that is inside the buttton
      calculator.chooseOperation(button.innerText);
      //Updates display values everytime a button is clicked on calculator
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  });
  