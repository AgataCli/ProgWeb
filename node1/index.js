const http = require("http");
const fs = require("fs");

const server = http.createServer((req,res)=>{
    process.argv.forEach((val, index) => {
        if(index == 2){ dir = val;}});

    fs.readdir(`${dir}/`,(err,files)=>{
        if(err){
            res.write(err);
        } else{
            const arr = files.toString().split(",")
            for(let i = 0; i<arr.length;i++){
                res.write(`${arr[i]}\n`);
            }
        }
        res.end();
    });
});

server.listen(3000);
