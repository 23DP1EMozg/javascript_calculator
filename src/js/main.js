const operationButtons = document.querySelectorAll(".operation")
const input = document.getElementById("calc-input")
const clearButton = document.getElementById("clear")
const equalButton = document.getElementById('equal')
const backspace = document.getElementById("back")

window.addEventListener('load', () => input.focus())

const validChars = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '0', '/', '*',
    '-', '+', '.',
    '(', ')'
]

const operators = ['-', '+', '/', '*', '.']

let query = ""

const calculate = () => {
    updateValues(eval(query))
}

const updateValues = (value) => {
    input.value = value
    input.textContent = value
    query = String(value)
}

const isValid = (char) => {
    return validChars.includes(char)
}




const handleInput = (e) => {
    const val = e.target.value
    const char = val.slice(-1)
    console.log(char)
    
    if(char === '='){
        calculate()
        updateValues(query)
        return
    }
    if(!isValid(char)){
        updateValues(query)
        return
    }
    if(operators.includes(query[query.length - 1]) && operators.includes(char)){
        updateValues(query)
        return
    }

    if(operators.slice(1).includes(char) && query.length < 1){
        updateValues(query)
        return
    }


    query += char        
    updateValues(query)

}


const handleBackspace = (e) => {
    e.preventDefault()

    if(query.length > 0){
        updateValues(query.slice(0, -1))
    }
    
}

clearButton.addEventListener('click', () => updateValues(""))

equalButton.addEventListener('click', calculate)



operationButtons.forEach((btn) => {
    btn.addEventListener('click', handleInput)
})

backspace.addEventListener('click', handleBackspace)


input.addEventListener('keydown', (e) => {
    if(e.key === "Enter"){
        calculate()
    }else if(e.key === 'Backspace'){
        handleBackspace(e)
    }
})




input.addEventListener("input", handleInput)

