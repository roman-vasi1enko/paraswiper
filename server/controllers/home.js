const express = require("express");
const app = express();
const path=require('path');

let twoStepBack=path.join(__dirname,'../../');

module.exports = {
    // getIndex: (req, res) => {
    //   res.render("client/public/index.html");
    // },
    getIndex: (req, res) => {
        res.sendFile(twoStepBack + '/client/public/index.html');
    },
  };