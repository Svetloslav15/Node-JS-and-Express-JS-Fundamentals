const fs = require('fs');
let data = "JavaScript";

fs.writeFile('text.txt', data, err => {
    console.log(err);
});
fs.readFile("text.txt", "utf8", (err, data) => {
   console.log(data);
});