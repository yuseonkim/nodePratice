"use strict";
//모듈
const express = require('express');
const app = express();
const home = require("./src/routes/home/index");
const PORT = 3000;


//앱 세팅
app.set("views", "./src/views");
app.set("view engine","ejs");

app.use(express.static(`${__dirname}/src/public`));

app.use(express.json());
//url을 통해 들어오는 데이터에 한글,공백 오류 해결
app.use(express.urlencoded({ extended : true}));

app.use("/",home);//use -> 미들웨어등록



module.exports = app;