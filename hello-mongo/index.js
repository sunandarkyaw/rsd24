const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017");
const db = client.db("todo");
const tasks = db.collection("tasks");
const x = client.db("x");

async function GetData() {
    const data = await x.collection("posts")
        .aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "owner_user",
                },
            },
            { $limit: 1, },
        ]).toArray();
    console.log(data[0].owner_user);
    process.exit(0);
}

async function InsertData(data) {
    const result = await tasks.insertOne(data);
    console.log(result);
    process.exit(0);
}


//InsertData({subject:'Milo', done:true});

GetData();