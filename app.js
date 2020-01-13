let axios = require("axios");
let MongoClient = require("mongodb").MongoClient;
let mongoParams = { useNewUrlParser: true, useUnifiedTopology: true };
// useUnifiedTopology: true

let dateFns = require("date-fns");

let t = dateFns.format(new Date(), "yyyy-MM-dd");

let tMonth = dateFns.format(dateFns.addMonths(new Date(), 1), "yyyy-MM-dd");
let tWeek = dateFns.format(dateFns.addWeeks(new Date(), 1), "yyyy-MM-dd");

let baseUrl = "https://api.stlouisfed.org/fred";

let apiKey = 'b5271dff85f7f82f8de9b29aa8eb3c40'
let mongoUrl = 'mongodb+srv://mchennupati:Tucher1@cluster0-hnc4i.azure.mongodb.net/test'

function builder(baseUrl, apiKey, start, end) {
  let futureDate = "&include_release_dates_with_no_data=true";

  let url =
    baseUrl +
    "/releases" +
    "/dates?" +
    "api_key=" +
    apiKey +
    "&realtime_start=" +
    start +
    "&realtime_end=" +
    end +
    futureDate +
    "&file_type=json";
  return url;
}
// a test json file to see if connecting to db works.
let d = {
  release_id: 440,
  release_name: "Coinbase Index",
  release_last_updated: "2020-01-13 06:00:02-06",
  date: "2020-01-20"
};

let newUrl = builder(baseUrl, apiKey, t, tWeek);
console.log(newUrl);
// Get Data from Fred
let client = new MongoClient(mongoUrl, mongoParams);

client.connect(err => {
  if (err) {
    console.log(err.message);
    throw new Error("failed to connect");
  }

  let datab = client.db("fred");
  console.log("db connected");

  try {
    axios.get(newUrl).then(res => {
      try {
        datab
          .collection("macroData")
          .insertOne({ dates: res.data.release_dates });
        console.log("insert succeeded");
      } catch (err) {
        console.log("insert failed");
        console.log(err.message);
      }
    });
  } catch (err) {
    throw Error("axios get did not work");
  }
});
