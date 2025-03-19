function findLongestWord(str){
    let words = str.split(' ');
    let result=""
    for(let i=0;i<words.length;i++){
        if(words[i].length>result.length){
            result=words[i];
        }
    }
    return result
}


console.log(findLongestWord("asdsa dasdsads daswdas"))