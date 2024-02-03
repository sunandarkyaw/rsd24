const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
//extended: false => node ရဲ့ default parser ကိုပဲ သုံးပါမယ်
app.use(bodyParser.json());

const cors=require("cors");
app.use(cors());
// app.header("Access-control-allow-origin","*");
// app.header("Access-control-allow-methods","*");

const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient("mongodb://localhost:27017");

const db = client.db("todo");
const tasks = db.collection("tasks");

app.get('/tasks', async (req, res) => {
    const data = await tasks.find().toArray();
    return res.json(data);
});

app.get('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const _id = new ObjectId(id);

        const data = await tasks.findOne({ _id });
        return res.json(data);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    };
});

app.post('/tasks', async (req, res) => {
    const { subject } = req.body;
    if (!subject) {
        return res.status(400).json({ msg: 'subject required' });
    }
    try {
        const result = await tasks.insertOne({ subject, done: true });
        const data = await tasks.findOne({ _id: new ObjectId(result.insertedId) });
        return res.json(data);
    }
    catch (e) {
        return res.json(e);
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const _id = new ObjectId(id);

        await tasks.deleteOne({ _id });
        return res.sendStatus(204);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    };
})

app.put('/tasks/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const _id = new ObjectId(id);

        const { subject } = req.body;
        if (!subject) {
            return res.status(400).json({ msg: "subject required" });
        }

        const result = await tasks.updateOne({ _id }, {
            $set: { subject }
        });
        const data = { _id: result.insertedId, subject };
        return res.json(data)
    }
    catch (e) {
        res.status(500).json({ msg: e.message });
    };
})

app.put('/tasks/toggle/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const _id = new ObjectId(id);

        const current = await tasks.findOne({ _id });
        const done = !current.done;

        const result = await tasks.updateOne({ _id }, {
            $set: { done }
        });
        const data = await tasks.findOne({ _id });
        return res.json(data);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    };
})

app.listen(8888, () => {
    console.log("Todo api running at 8888.")
});