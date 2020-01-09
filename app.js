var MongoClient = require('mongodb').MongoClient
var axios = require('axios')

let placeHolder = {"name": "schenn",
                    "value" : "Play Whatever"
                    }
let mongoUrl = 'mmongodb+srv://user:password@cluster0-hnc4i.azure.mongodb.net/test?retryWrites=true&w=majority'
let params = 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }

var db_name = 'test'

async function saveData(searchQuery){

    let client = new MongoClient(mongoUrl, params)

    try{
        client.connect( (err,res) => {
            if (err) throw err
            let db = client.db(db_name)
            db.collection("macroData").insertOne(placeHolder)
            console.log("connected successfully")

            var query = {"value":"Whatever"}
            db.collection("macroData").find(query).toArray( (err, result)=>{
                if (err) console.log(err)
                console.log(result)
            })
        })
    }
    catch (err) {
        console.log(err.stack)
    }

}

saveData()




