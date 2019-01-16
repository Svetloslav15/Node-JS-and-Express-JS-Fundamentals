const fs = require('fs')
const filePath = './views/home.html'
const router = require('express').Router();

router.get('/', (req, res) => {
        fs.readFile(filePath, (err, data) => {
            if(err){
                console.log(err)
                return
            }
            res.writeHead(200,{
                'Content-Type':'text/html'
            });
            res.end(data)
        })
        return true;
});


module.exports = router;