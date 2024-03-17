require("dotenv").config();

const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient(process.env.MONGO_HOST);
const xdb = mongo.db("x");
const xnotis = xdb.collection("notis");

const { auth } = require("../middlewares/auth");

const { clients } = require("../index");

router.get("/notis", auth, async (req, res) => {
    const user = res.locals.user;
    const notis = await xnotis.aggregate([
        {
            $match: {
                owner: new ObjectId(user._id),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "actor",
                foreignField: "_id",
                as: "actor",
            }
        },
        {
            $unwind: "$actor"
        },
        {
            $sort: { _id: -1 },
        }
    ]).toArray();
    return res.json(notis);
})

router.put("/notis/:id", async (req, res) => {
    const { id } = req.params;
    const result = await xnotis.updateOne(
        {
            _id: new ObjectId(id)
        },
        {
            $set: { read: true }
        });

    return res.json(result);
})

router.post("/notis/:type", auth, async (req, res) => {
    const { type } = req.params;
    const user = res.locals.user;
    const { owner, target } = req.body

    if (!owner ?? !target) {
        return res.status(400).json({ msg: 'owner, target: required' });
    }

    try {
        const result = await xnotis.insertOne({
            type,
            actor: new ObjectId(user._id),
            msg: `${type}s your post`,
            owner: new ObjectId(owner),
            target: new ObjectId(target),
            read: false,
            created: new Date()
        });

        clients.map(client => {
            if (client._id === user._id) {
                client.send("Noti update");
            }
        })
        return res.json(result);
    }
    catch (e) {
        return res.status(500).json({ msg: e.message });
    }
})

module.exports = { notisRouter: router };