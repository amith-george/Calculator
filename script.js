
// Selectors

prevscreen = document.querySelector("#preview");
displayscreen = document.querySelector("#display");

buttonList = document.querySelectorAll("button");


// Calculator functions

function add(x,y) {
    return x+y;
}

function subtract(x,y) {
    return x-y
}

function multiply(x,y) {
    return x*y;
}

function divide(x,y) {
    return x/y;
}

function modulus(x,y) {
    return x % y;
}

// Operation function

let numone='';
let numtwo='';
let operation='';
let newNumone;
let newNumtwo;
let newOperation;
let newChecknumone;

let checknumone = true;

function operate(numone,numtwo,operator, callback){
    x = parseFloat(numone);
    y = parseFloat(numtwo);
    let result = 0;
    let count=0;
    switch(operator)
    {
        case "+":
            result = add(x,y);
            displayscreen.textContent = result;
            break;
        case "-":
            result = subtract(x,y);
            displayscreen.textContent = result;
            break;
        case "×":
            result = multiply(x,y);
            displayscreen.textContent = result;
            break;
        case "÷":
            result = divide(x,y);
            displayscreen.textContent = result;
            break;
        case "%":
            result = modulus(x,y);
            displayscreen.textContent = result;
            break;
        default:
            alert("Enter two numbers!");
            count++;
            break;
    }
    if(count == 0)
    {
    displayscreen.textContent = result;
    prevscreen.textContent = numone +" "+operation+" "+numtwo+" = ";
    numone = result.toString();
    numtwo = '';
    operation = '';
    checknumone = true;
    callback(numone, numtwo, operation, checknumone);
    }
}





buttonList.forEach(item => {
    if(item.className.includes("ac")){
        item.addEventListener("click", function(){
            displayscreen.textContent = "0";
            prevscreen.textContent = "";
            numone = '';
            checknumone = true;
            numtwo = '';
            operation = "";
        });
    }
    else if(item.className.includes("number")){
        item.addEventListener("click", function(){
            checknum(item.innerText);
            displayscreen.textContent += item.innerText;
        });
    }
    else if(item.className.includes("operation")){
        item.addEventListener("click", function(){
            if(numone == "")
            {
                alert("Please enter a number first!");
            }
            else{
            if(checknumone)
            {
                checknumone = false;
            }
            if(numone != "" && numtwo != "")
            {
                operate(numone, numtwo, operation, (newNumone,newNumtwo, newOperation, newChecknumone) => {
                    numone = newNumone;
                    numtwo = newNumtwo;
                    operation = newOperation;
                    checknumone = newChecknumone;
                });
            }
            else
            {
            operation = item.innerText;
            prevscreen.textContent = numone +" "+operation+" ";
            displayscreen.textContent = "";
            }
        }
        });
    }
    else if(item.className.includes("enter")){
        item.addEventListener("click", function(){
            if(checknumone == false)
            {
                checknumone = true;
            }
            operate(numone, numtwo, operation, (newNumone,newNumtwo, newOperation, newChecknumone) => {
                numone = newNumone;
                numtwo = newNumtwo;
                operation = newOperation;
                checknumone = newChecknumone;
            });
        })
    }
    else if(item.className.includes("posneg")) {
        item.addEventListener("click",function() {
            if(checknumone)
            {
                numone = toggleSign(numone);
                displayscreen.textContent = numone;
            }
            else{
                numtwo = toggleSign(numtwo);
                displayscreen.textContent = numtwo;
            }
        })
    }
    else if(item.className.includes("decimal")){
        item.addEventListener("click", function(){
            if(checknumone)
            {
                if(numone.includes(".")){
                    alert("What number has 2 decimal points buddy? What are you, dumb?");
                }
                else{
                numone += ".";
                displayscreen.textContent = numone;
                }
            }
            else{
                if(numtwo.includes(".")){
                    alert("What number has 2 decimal points buddy? What are you, dumb?");
                }
                else{
                numtwo += ".";
                displayscreen.textContent = numtwo;
                }
            }
        })
    }
});


function toggleSign(x){
    return (parseFloat(x) * -1).toString();
}



function checknum(x){
    if(displayscreen.innerText == 0 && x==0)
    {
        displayscreen.innerText="";
    }
    else if(displayscreen.innerText == 0 && x!=0)
    {
        displayscreen.innerText="";
        if(checknumone){
            numone+=x;
        }else{
            numtwo+=x;
        }
    }
    else{
        if(checknumone){
            numone+=x;
        }
        else{
            numtwo+=x;
        }
    }

}
