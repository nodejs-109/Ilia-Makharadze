const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log(data);
});


// const data = fs.readFileSync('input.txt', 'utf8');
// console.log(data); // reaadSync
