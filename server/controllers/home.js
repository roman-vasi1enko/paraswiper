<<<<<<< HEAD
import { fileURLToPath } from 'url';
import path from 'path';

export function getIndex(req, res) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    let buildPath = path.join(__dirname, '../../client/build');
    res.sendFile(path.join(buildPath, 'index.html'));
}
=======
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
>>>>>>> main-holder
