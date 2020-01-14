let MongoClient = require('mongodb').MongoClient
let db_name = 'fred'
let collection_name = 'macroData'
let mongoUrl = 'mongo url here'
let mongoParams = {useNewUrlParser: true, useUnifiedTopology: true}


let client = new MongoClient(mongoUrl,mongoParams)
let result

function searchCal(term, url) {
  let result 
  let client = new MongoClient(url,mongoParams)
  
  client.connect(err => {
        if (err) {
        console.log(err.message)
        throw new Error("failed to connect")
        }
      
  let dbase = client.db(db_name)
  console.log('db connected')
  
  // Get the documents collection
  var collect = dbase.collection('macroData');
  // Create the index
  collect.createIndex(
            { release_name : "text" }
  )
          

  collect.find({ $text: { $search: term } }).toArray()
          .then(res => {
            console.log(res)
          })



})



}


searchCal("FOMC",mongoUrl)
