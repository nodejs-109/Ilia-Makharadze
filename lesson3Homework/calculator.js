let input1=prompt("enter first number")
do  {
    if(isNaN(input1)){
        alert("invalid input")
        
    }

}while(isNaN(input1))
let input2=prompt("enter second number")
do{

    if(isNaN(input1)){
        alert("invalid input")
    }
}while(isNaN(input2))

let operation=prompt("enter aritmetical operation")
switch(operation){
    case "+": alert(`${input1}+${input2}=${Number(input1)+Number(input2)}`);break;
    case "-":alert(`${input1}-${input2}=${Number(input1)-Number(input2)}`);break;
    case "*":alert(`${input1}*${input2}=${Number(input1)*Number(input2)}`);break;
    case "/":alert(`${input1}/${input2}=${Number(input1)/Number(input2)}`);break;
    default: alert("invalid operation");
}

