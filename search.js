let MongoClient = require('mongodb').MongoClient
let db_name = 'fred'
let collection_name = 'macroData'
let mongoUrl = "add your url here"
let mongoParams = {useNewUrlParser: true, useUnifiedTopology: true}


let client = new MongoClient(mongoUrl,mongoParams)
let result

client.connect(err => {
        if (err) {
            console.log(err.message)
            throw new Error("failed to connect")
        }
        let dbase = client.db(db_name)
        console.log('db connected')

            // Get the documents collection
            var collection = dbase.collection('macroData');
            // Create the index
            collection.createIndex(
              { release_name : "text" }, function(err, result) {
              console.log(result);
            });
       
       console.log(collection.find({ $text: { $search: "fed" } }))
        
    })

