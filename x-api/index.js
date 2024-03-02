require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const { usersRouter } = require("./routers/users");
const { postsRouter } = require("./routers/posts");
app.use(usersRouter);
app.use(postsRouter);
app.listen(process.env.PORT, () => {
    console.log(`X API running at ${process.env.PORT}`);
})

// const jwt = require("jsonwebtoken");
// //jwt is not hash token, it is encrypted token so can transform to original form.
// const token = jwt.sign({ name: 'Tom', role: 'admin' }, 'secret');

// console.log(token);

// //decrypt token, must know which secret key is used.
// const data = jwt.verify(token, 'secret');
// console.log(data);