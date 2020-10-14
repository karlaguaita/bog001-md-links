#!/usr/bin/env node

const mdlinks = require('./index.js')
const chalk = require('chalk');

const path= process.argv[2]

const options = process.argv

let validate = false, status = false

options.forEach(element => {
    if (element == "--validate")
        validate = true
    if (element == "--status")
        status = true
});

console.log(path, validate, status)

if (!validate && !status)
{
    mdlinks(path).then((resp)=>{
        // console.log(resp)
        resp.forEach(element =>{
            console.log(chalk.magenta(element.file)+' '+chalk.blue(element.href)+' '+ chalk.green(element.text))
        })
    })
}
else if(validate && !status)
{
    mdlinks(path, {validate: true}).then((resp)=>{
        // console.log(resp)
        resp.forEach(element =>{
            console.log(chalk.red(element.file)+' '+chalk.yellow(element.href)+' '+chalk.cyan(element.ok)+' '+chalk.magenta(element.status)+' '+chalk.blue(element.text))
        })
    })
}
else if(!validate && status)
{
    mdlinks(path, {validate: true}).then((resp)=>{
        // Revisamos los unicos
        let unicos = resp.filter(function(item, index, array) {
            return array.indexOf(item) === index;
        })

        // console.log(resp)
        let total = resp.length

        console.log('total: ', total)
        console.log('unique: ', unicos.length)
    })
}
else if(validate && status)
{
    mdlinks(path, {validate: true}).then((resp)=>{
        // Revisamos los unicos
        let unicos = resp.filter(function(item, index, array) {
            return array.indexOf(item) === index;
        })

        // console.log(resp)
        let total = resp.length
        let correctos = 0
        resp.forEach(element =>{
            if (element.ok)
                correctos++
        })
        console.log('Total: ', total)
        console.log('Unique: ', unicos.length)
        console.log('Ok: ', correctos)
        console.log('Broken: ', total-correctos)
    })
}


