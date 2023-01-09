"use strict";


const users = {
    id : ["a"],
    psword : ["a"],
};

const output = {
    home : (req,res)=>{ 
        res.render("home/index");
    },

    login : (req,res)=>{
        res.render("home/login");
    },

    register : (req,res)=>{
        res.render("home/register");
    }
};

const response = {};
const process = {
    login : (req,res)=>{
        const id = req.body.id;
        const psword = req.body.psword; 
       
        if(users.id.includes(id)){
            const idx = users.id.indexOf(id);
            if(users.psword[idx] === psword){
                response.success = true;
                return res.json(response);
            }
        }
        response.success = false;
        response.msg = "로그인 실패";
        return res.json(response);
    },

    register : (req,res)=>{
        console.log("yes");
        const id = req.body.id;
        const psword = req.body.psword;

        if(users.id.includes(id)){
            response.success = false;
            response.msg = "이미 존재하는 아이디";
            return res.json(response);
        }
        response.success = true;
        return res.json(response);
    }
};
module.exports = {
    output,
    process,
}
