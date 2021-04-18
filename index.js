const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');
require('dotenv').config()


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4n73f.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()
app.use(cors())
app.use(express.json())
const port = 8080



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const serviceCollection = client.db("dayCare").collection("services");
  const reviewCollection= client.db("dayCare").collection("reviews");
  const bookingCollection= client.db("dayCare").collection("book");

  app.post('/addService',(req,res)=>{
      const newService=req.body
     
      serviceCollection.insertOne(newService)
      .then(result=>{

          res.send(result.insertedCount>0);
      })
  })

app.get('/allService',(req,res)=>{
    serviceCollection.find()
    .toArray((err,documents)=>{
        res.send(documents);

    })
})

app.get('/service/:id',(req,res)=>{
serviceCollection.find({_id:ObjectId(req.params.id)})
.toArray((err,documents)=>{
    res.send(documents[0]);
})
})


app.post('/addReview',(req,res)=>{
    const newReview=req.body
    console.log(newReview);
   
    reviewCollection.insertOne(newReview)
    .then(result=>{

        res.send(result.insertedCount>0);
        console.log(result.insertedCount)
        
    })
})

app.get('/review',(req,res)=>{
    reviewCollection.find()
    .toArray((err,documents)=>{
        res.send(documents);

    })
})


app.post('/addBooking',(req,res)=>{
    const newBook=req.body
    console.log(newBook);
   
    bookingCollection.insertOne(newBook)
    .then(result=>{

        res.send(result.insertedCount>0);
        console.log(result.insertedCount)
        
    })
})

app.get('/bookings',(req,res)=>{
    bookingCollection.find({email: req.query.email})
    .toArray((err,documents)=>{
        res.send(documents);
    })
})


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  console.log('db connected')
  
});




app.listen(process.env.PORT || port)