require("dotenv").config();

const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient(process.env.MONGO_HOST);
const xdb = mongo.db("x");
const xuser = xdb.collection("users");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { auth } = require("../middlewares/auth");

router.get("/verify", auth, (req, res) => {
    return res.json(res.locals.user);
});

router.get("/users", auth, async (req, res) => {
    const data = await xuser
        .find()
        .project({ password: 0 })
        .limit(20).toArray();
    return res.json(data);
});

router.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    const data = await xuser.findOne(
        { _id: new ObjectId(id) },
        { projection: { password: 0 } });
    return res.json(data);
})

router.post("/login", async (req, res) => {
    const { handle, password } = req.body;
    if (!handle || !password) {
        return res.status(400).json({
            msg: 'handle or password required'
        });
    }
    const user = await xuser.findOne(
        { handle },
        {
            projection: {
                followers: 0,
                following: 0
            }
        });
    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(user, process.env.JWT_SECRET);
            return res.json({ token });
        }
    }
    return res.status(401).json({
        msg: 'incorrect handle or password'
    });
});

router.post("/register", async (req, res) => {
    const {
        name,
        handle,
        password,
        profile,
    } = req.body;

    if (!name || !handle || !password) {
        return res.status(400).json({
            msg: 'name or handle or password required'
        });
    }
    let hash = await bcrypt.hash(password, 10);
    let data = {
        name: name,
        handle: handle,
        password: hash,
        profile: profile,
        created: new Date(),
        followers: [],
    }

    try {
        const result = await xuser.insertOne(data);
        data._id = result.insertedId;
        return res.json(data);
    }
    finally {
        console.log("Register done.");
    }
});


module.exports = { usersRouter: router };