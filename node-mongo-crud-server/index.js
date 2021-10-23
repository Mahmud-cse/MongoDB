const express= require('express');
const { MongoClient } = require('mongodb');
const cors=require('cors');
const ObjectId=require('mongodb').ObjectId;

const app=express();
const port=process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// user:modbuser1
// pass:Y85dz61Pj6jh0ZxO

const uri = "mongodb+srv://modbuser1:Y85dz61Pj6jh0ZxO@cluster0.ehrxz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db("products");
    const usersCollection = database.collection("items");

    // Get all data from mongodb
    //Get api
    app.get('/products',async(req,res)=>{
      const cursor=usersCollection.find({});
      const products=await cursor.toArray();
      res.send(products);
    });


    // get single data api
    app.get('/products/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:ObjectId(id)};
      const product=await usersCollection.findOne(query);
      console.log('load user with id: ',id);
      res.send(product);
    })


    
    // take data from UI and send it to database
    // POST API
    app.post('/products',async(req,res)=>{
      const newProduct=req.body;
      const result=await usersCollection.insertOne(newProduct);
      console.log('got new product',req.body);
      console.log('added user',result);
      res.json(result);
    });

    // Update API
    app.put('/products/:id',async(req,res)=>{
      const id=req.params.id;
      const updatedProduct=req.body;
      const filter={_id:ObjectId(id)};
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: updatedProduct.name,
          email: updatedProduct.email
        },
      };
      const result=await usersCollection.updateOne(filter,updateDoc,options);
      console.log("updating Products ",id);
      res.json(result);
    })


    //Delete API 
    app.delete('/products/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:ObjectId(id)};
      const result= await usersCollection.deleteOne(query);
      console.log('deleting products with id',id);
      console.log('deleting products result',result);
      res.json(result);
    });


  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('running my crud server');
});

app.listen(port,()=>{
    console.log('Running server on port',port);
})
