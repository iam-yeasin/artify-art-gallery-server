const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const admin = require("firebase-admin");
const serviceAccount = require("./artifyKey.json");
const dns = require("dns");
const app = express();
const port = process.env.PORT || 3000;
// console.log(process.env);

app.use(cors());

app.use(express.json());

dns.setServers(["1.1.1.1", "8.8.8.8"]);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6giibzh.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const middleWare = (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  console.log(token);
  next();
};

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const db = client.db("artify-art-gallery");
    const dataCollections = db.collection("samples");

    //find
    //findOne

    app.get("/samples", async (req, res) => {
      const result = await dataCollections.find().toArray();
      res.send(result);
    });

    //post methode
    //insertOne
    //insertMany

    app.post("/samples", async (req, res) => {
      const data = req.body;
      // console.log(data);
      const result = await dataCollections.insertOne(data);
      res.send({
        success: true,
        result,
      });
    });

    // show details
    app.get("/samples/:id", middleWare, async (req, res) => {
      const { id } = req.params;
      console.log(id);
      const individualResult = await dataCollections.findOne({
        _id: new ObjectId(id),
      });
      res.send({
        success: true,
        individualResult,
      });
    });

    // put
    // updateOne
    // updateMany

    app.put("/samples/:id", async (req, res) => {
      const { id } = req.params;
      const data = req.body;
      // console.log(id);
      // console.log(data);
      const objectId = new ObjectId(id);
      const filter = { _id: objectId };
      const update = {
        $set: data,
      };

      const result = await dataCollections.updateOne(filter, update);

      res.send({
        success: true,
        result,
      });
    });

    //delete
    // deleteOne
    // deleteMany

    app.delete("/samples/:id", async (req, res) => {
      const { id } = req.params;
      const objectId = new ObjectId(id);
      const filter = { _id: objectId };
      const result = await dataCollections.deleteOne(filter);
      //alt way
      // const result = await dataCollections.deleteOne({ _id: new ObjectId(id) });

      res.send({
        success: true,
        result,
      });
    });

    //latest 6 data
    //get
    //find

    app.get("/latest-data", async (req, res) => {
      const result = await dataCollections
        .find()
        .sort({ date: "desc" }) //desc/1
        .limit(6)
        .toArray();
      console.log(result);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
