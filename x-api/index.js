require("dotenv").config();

const express = require("express");
const app = express();

require("express-ws")(app);

const cors = require("cors");
app.use(cors());

app.use("/static", express.static("./photos"));

//const { auth } = require("./middlewares/auth");

const { usersRouter } = require("./routers/users");
const { postsRouter } = require("./routers/posts");
const { notisRouter } = require("./routers/notis");
app.use(usersRouter);
app.use(postsRouter);
app.use(notisRouter);

// export const clients = [];

// app.ws("/subscribe", auth, (ws, req) => {
//     ws.on("message", msg => {
//         const data = JSON.parse(msg);
//         if (clients.find(client => client._id === data._id)) {
//             clients.push({ _id: data._id, ws });
//         }
//     })
// })

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