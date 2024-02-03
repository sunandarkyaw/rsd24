const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017");
const db = client.db("todo");
const tasks = db.collection("tasks");

async function GetData() {
    const data = await tasks.find().limit(1).toArray();
    console.log(data);
    process.exit(0);
}

async function InsertData(data) {
    const result = await tasks.insertOne(data);
    console.log(result);
    process.exit(0);
}


//InsertData({subject:'Milo', done:true});

GetData();