const { MongoClient, ServerApiVersion, ObjectId   } = require('mongodb');
const express = require('express')
const app = express()
const cors = require("cors");
const port = process.env.PORT|| 5000


app.use(cors())
app.use(express.json())

//mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pbaqirc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try{
        const itemsColletion = client.db('content-redux').collection('items')

    app.get('/', (req, res) =>{
        res.send('Simple node server')
    })

    //get all data
    app.get('/items', async(req,res)=>{
        const query ={}
        const result = await itemsColletion.find(query).toArray()
        res.send(result)
    })

    //id-filter
    app.get('/items/:id', async (req,res)=>{
        const ids = req.params.id;
        const query = {_id: new ObjectId(ids)}
        const result = await itemsColletion.findOne(query)
        res.send(result)
    });

    //add-item
    app.post('/items', async(req,res)=>{
        const query = req.body
        const result = await itemsColletion.insertOne(query)
        res.send(result)
    })

    app.delete('/items/:id', async(req,res)=>{
        const ids = req.params.id
        const query = {_id: new ObjectId(ids)}
        const result = await itemsColletion.deleteOne(query)
        res.send(result)
    })

    app.put('/items/:id', async(req,res)=>{
        const ids = req.params.id
        const query = {_id: new ObjectId(ids)}
        const user = req.body
        const option = {upsert: true}
        const updateUser ={
            $set :{
                name: user.name,
                image: user.image,
                cetagori: user.ceta,
                about: user.about,
                month: user.month,
                years: user.year,
                status:true
            }
        }
        const result = await itemsColletion.updateOne(query, updateUser, option)
        res.send(result)
    })

    }


    finally{
    }
}
run().catch(err=> console.log(err))




app.listen(port, ()=>{
    console.log(`server running ${port}`);
})

