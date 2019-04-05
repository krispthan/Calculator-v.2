$(document).ready(initializeCalculator);


function initializeCalculator() {
 handleClickHandlers();
}

var calculatorButtons = {
    equationArray: [],
    currentNumber: '',
    currentOperator: '',

    storedCacheArray: {
        previousNum2:'',
        previousOperator:'',
    },
    keyOperators: {
        "x": "",
        "-": "",
        "/": "",
        "*": "",
    }
}

function handleClickHandlers(){
$('.num-button').click(displayNumbers);
$('.operator-btn').click(displayOperators);
$('.clear-all-btn').click(displayClearAllOperator);
$('.clear-entry-btn').click(displayCEOperator);
$('.equal-btn').click(displayEqualOperator);
$('.decimal-btn').click(decimalButtonPressed);
}

//Buttons Display
function displayNumbers(){
    checkIfCurrentNumIsError();
    var value = $(this).attr('data-num');
    NumbersPressed(value);
    $('#display').text(convertsArrayElementsToStrings());
   
    
    
}
function displayOperators(){
    checkIfCurrentNumIsError();
   var value = $(this).attr('data-operator');
   calculatorButtons.currentOperator = value;
   OperatorPressed(value);
   $('#display').text(convertsArrayElementsToStrings());
   
}

function displayCEOperator(){
    var value= $(this).attr('data-type-C');
    clearCEButtonPressed();
    $('#display').text(convertsArrayElementsToStrings());
    
}

function displayClearAllOperator(){
      var value =$(this).attr('data-type-CE');
      clearAllButtonPressed();
      $('#display').text(convertsArrayElementsToStrings());
}

function decimalOperator(){
    var value=$(this).attr('data-decimal-operator');
    decimalButtonPressed();
    $('#display').text(convertsArrayElementsToStrings());
}

function displayEqualOperator(){
    var value=$(this).attr('data-equal');
    equalButtonPressed();
    $('#display').text(convertsArrayElementsToStrings());
      
}

function convertsArrayElementsToStrings() {
    var turnIntoString = '';
    if (calculatorButtons.equationArray) {
        for (var i = 0; i < calculatorButtons.equationArray.length; i++) {
            turnIntoString += calculatorButtons.equationArray[i] + ' ';
        }
    }
    if (calculatorButtons.currentNumber) {
        turnIntoString += calculatorButtons.currentNumber;
    }
    return turnIntoString;
}

function NumbersPressed(number){
    calculatorButtons.currentNumber += number;  
    }


function OperatorPressed(operator){
     if(this.calculatorButtons.currentNumber != ""){
        calculatorButtons.equationArray.push(calculatorButtons.currentNumber);
     }
    calculatorButtons.equationArray.push(calculatorButtons.currentOperator);
    calculatorButtons.currentNumber="";
    calculatorButtons.currentOperator = "";
}

function clearCEButtonPressed(){
    if (this.calculatorButtons.currentNumber === "") {
        if (this.calculatorButtons.equationArray.length === 0) {
            return;
        } else {
            this.calculatorButtons.equationArray.pop();
        }
    } else{
        this.calculatorButtons.currentNumber = this.calculatorButtons.currentNumber.substring(0,this.calculatorButtons.currentNumber.length- 1);
    }
}

function clearAllButtonPressed(){
    calculatorButtons.currentOperator = "";
    calculatorButtons.currentNumber ="";
    calculatorButtons.currentNumber =[];
}

function decimalButtonPressed(){
    calculatorButtons.currentNumber += number;  
}

function createValidNumberString(num) {
    var checkForDecimal = true;
    var tempNumberString = "";
    for (var i = 0; i < num.length; i++) {
        var currentIndex = num[i];
        if (currentIndex != "." || checkForDecimal) {
            tempNumberString += currentIndex;
            if (currentIndex === ".") {
                checkForDecimal = false;
            }
        }
    }
    return tempNumberString;
}

 function formatArray() {
     var oneOperatorArray = [];
     for (var i = 0; i < this.calculatorButtons.equationArray.length; i++){
         var currentNum = this.calculatorButtons.equationArray[i];
         if (!checkIfOperator(currentNum)) {
            oneOperatorArray.push(currentNum)
         } else if (i === this.calculatorButtons.equationArray.length - 1){
            oneOperatorArray.push(currentNum);
             this.calculatorButtons.equationArray = oneOperatorArray
             return;
         }
         else if(checkIfOperator(currentNum) && !checkIfOperator(this.calculatorButtons.equationArray[i + 1])){
            oneOperatorArray.push(currentNum);
     }
 }
 }

function equalButtonPressed() {
    formatArray();
    var doMathResult=null;
    if(this.calculatorButtons.equationArray.length <2){
         doMathResult = doMath(this.calculatorButtons.currentNumber,
            this.calculatorButtons.storedCacheArray.previousNum2,
            this.calculatorButtons.storedCacheArray.previousOperator);
            this.calculatorButtons.equationArray.push(doMathResult); 
    } else {
        if(this.calculatorButtons.currentNumber){
            this.calculatorButtons.equationArray.push(this.calculatorButtons.currentNumber);
            this.calculatorButtons.currentNumber="";
        }
        for(var i = 0; i < this.calculatorButtons.equationArray.length; i++) {
            if(checkIfOperator(this.calculatorButtons.equationArray[i])) { 
                if(i === this.calculatorButtons.equationArray.length-1){
                    doMathResult = doMath(this.calculatorButtons.equationArray[i-1],
                        this.calculatorButtons.equationArray[i-1],
                        this.calculatorButtons.storedCacheArray.previousOperator);
                        this.calculatorButtons.equationArray.push(doMathResult);
                }
                else{
                    doMathResult =doMath(
                        this.calculatorButtons.equationArray[i-1],
                        this.calculatorButtons.equationArray[i+1],
                        this.calculatorButtons.equationArray[i]);
                        this.calculatorButtons.equationArray[i+1]= doMathResult; 
                } 

            }

            }
        } 
    var equationResult = "";
    if(doMathResult === 'Error'){
        equationResult = 'Error';
     
    } else {
       equationResult =this.calculatorButtons.equationArray[this.calculatorButtons.equationArray.length-1];
    }
    this.calculatorButtons.equationArray = [];
    this.calculatorButtons.currentNumber = equationResult;
    $('#display').text(equationResult);   
 }




  function doMath(num1,num2, operators){
      var result=null;
    calculatorButtons.storedCacheArray.previousNum2 = num2;
    calculatorButtons.storedCacheArray.previousOperator=operators;
    createValidNumberString(num1,num2,operators);
    if(typeof num1 ==='string'){
        num1 = parseFloat(createValidNumberString(num1));
    }
    if(typeof num2 === 'string'){
        num2=parseFloat(createValidNumberString(num2));
    }
    switch(operators){
        case "+":
        result = num1 + num2;
        break;
        case "-":
        result = num1 - num2;
        break;
        case "÷":
        if(num2 === 0){
            return "Error";
        }
        result = num1 /num2;
        break;
        case "x":
        result = num1 * num2;
    }
    return result;
}


function convertStringsToNumber(num,operator){
    if(!this.calculatorButtons.keyOperators){
        parseInt(this.calculatorButtons.currentNumber, 10);
    } else {
        return;
}
}

function checkIfOperator(input){
   if(input === "x" || input ==="-" || input ==="+" || input === "÷"){
       return true;
   } else {
       return false;
   }
}

function checkIfCurrentNumIsError(){
   if(this.calculatorButtons.currentNumber === 'Error'){
       this.calculatorButtons.currentNumber="";
   }
}



