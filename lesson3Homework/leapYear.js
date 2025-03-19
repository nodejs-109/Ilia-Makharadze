let input=prompt("Enter year for which you want to know whether it is a leap year or not");
if(input%400!=0 && input%100===0){
    alert(input+" is not leap year")
}
else if(input%4===0){
    alert(input+" is a leap year");
}else{
    alert(input+" is not leap year");
}