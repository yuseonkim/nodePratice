const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const static = require('serve-static');
const dbconfig = require('./config/dbconfig.json');
//풀: 

//Database connection pool
const pool = mysql.createPool({
    connectionLimit : 10,
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    password : '0143',
    database : 'Node',
    debug : false,
})

app.set("views", "./views");
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/public',static(path.join(__dirname, 'public')));;


app.get('/adduser',(req,res)=>{
    res.render('adduser');
})
app.post('/process/adduser',(req,res)=>{
    console.log('/process/adduser 호출됨 '+req )

    const paramId = req.body.id;
    const paramName = req.body.name;
    const paramPsword = req.body.psword;
    const paramAge = req.body.age;

    pool.getConnection((err,conn)=>{
        if(err){         
            console.log(err)
            console.log("Mysql getConnection error, aborted");
            return;
        }
        console.log("db 연결 완료");
        
        const exec = conn.query("insert into users (id,name,age,password) values (?,?,?,password(?));",
                [paramId,paramName,paramAge,paramPsword],
                (err,result) => {
                    conn.release();
                    console.log('실행된 SQL' + exec.sql);

                    if(err){
                        console.log('SQL 실행 시 오류 발생');
                        console.dir(err);
                         
                        res.writeHead("200", {'Content-Type': 'text/html; charset=utf-8'});
                        res.write('<h2>쿼리문 실행 실패</h2>');
                        res.end();
                        return;
                    }

                    if(result) {
                        console.dir(result);
                        console.log(`Inserted 성공`);
                        
                        res.writeHead("200", {'Content-Type': 'text/html; charset=utf-8'});
                        res.write('<h2>사용자 추가 성공</h2>');
                        res.end();
                    }
                    else{
                        console.dir(result);
                        console.log(`Inserted 실패`);
                        
                        res.writeHead("200", {'Content-Type': 'text/html; charset=utf-8'});
                        res.write('<h2>사용자 추가 실패</h2>');
                        res.end();
                    }
                }
            
        
        )
    })
})

app.listen(3000,()=>{
    console.log('서버실행');
})