"use strict"

const id = document.querySelector('#id');
const psword = document.querySelector('#psword');
const collect = document.querySelector('#collect');

const registerBtn = document.querySelector('button');

registerBtn.addEventListener("click",register);

function register(){
    if(collect.value != psword.value){
        alert("비밀번호가 다릅니다");
    }
    else{
    const req = {
        id : id.value,
        psword : psword.value
    }

    fetch("/register",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(req),
    })
    .then((res)=>res.json())
    .then((res)=>{
        if(res.success){
            alert("ㅇㅅㅇ");
        }else{
            alert(res.msg);
        }
    })

}

    
}