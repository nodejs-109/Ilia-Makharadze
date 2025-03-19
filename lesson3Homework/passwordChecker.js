function isPasswordHard(password){
    if (password.length < 3) {
        console.log("invalid password");
        return;
    }
    else if(password.length>3 && password.length<=6){
        console.log("weak password")
        return
    }else if(password.length>6 && password.length<=8){
        console.log("this password is normal")
        return
    }
    else if(password.length>8 && password.length<=16){
        console.log("this password is hard")
        return
    }
    else if (/^\d+$/.test(password)) {  
        console.log("invalid password");
        return;
    }
}

isPasswordHard("sadasdas")

