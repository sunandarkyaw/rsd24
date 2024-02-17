const jwt = require("jsonwebtoken");
//jwt is not hash token, it is encrypted token so can transform to original form.
const token = jwt.sign({ name: 'Tom', role: 'admin' }, 'secret');

console.log(token);

//decrypt token, must know which secret key is used.
const data = jwt.verify(token, 'secret');
console.log(data);