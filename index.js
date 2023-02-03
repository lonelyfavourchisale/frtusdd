const app = require("express")();
const bodyParser = require("body-parser");
const logger = require("morgan");
var firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyCgCBxz9u9Q-IKgBZk8mlJUw2icHa0aqU4",

  authDomain: "ussd-be4c3.firebaseapp.com",

  databaseURL: "https://ussd-be4c3-default-rtdb.firebaseio.com",

  projectId: "ussd-be4c3",

  storageBucket: "ussd-be4c3.appspot.com",

  messagingSenderId: "195880245900",

  appId: "1:195880245900:web:25477a933deae90d1339a9",

  measurementId: "G-9JEGRHY1GM",
};

var getdistrictname = "lonely chisalel";
//inintilizing the app
firebase.initializeApp(firebaseConfig);

//getting database
var db = firebase.database();
var districts = [];
const ref = db.ref("weather/districts");

const handleDistrictResponse = (districtsArray) => {
  let dt = [];
  districtsArray.forEach((ds, index) => dt.push(`${index}. ${ds}`));
  return dt;
};

// ref.on("value", async (snapshot) => {
//   let dis = [];

//   //   console.log(snapshot);
//   snapshot.forEach((childSnapshot) => {
//     dis.push(childSnapshot.val().name);
//   });
//   return {};
// });

const port = process.env.PORT || 3030;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("*", (req, res) => {
  res.send("USSD deployed successfully");
});

app.post("*", (req, res) => {
  let { sessionId, serviceCode, phoneNumber, text, response } = req.body;
  //first
  if (text == "") {
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~First request for the FRT main menu~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    response = `CON Welcome to Farm Radio Trust
        1. Register
        2. Main Menu
        3. Help`;
  }
  //seconds
  else if (text == "1") {
    response = `CON Welcome to Mlimi Registration services. 
        
        1. Start Registration
        0. Main Menu
        `;
  } else if (text == "2") {
    response = `CON Mlimi Main Manu
		1. Advesories
		2. Weather reports
		3. Marketing
		4. Account
		5. help`;
  } else if (text == "2*2") {
    ref
      .once("value")
      .then(async (snapshot) => {
        let ds = [];
        await snapshot.forEach((childSnapshot) => {
          ds.push(childSnapshot.val().name);
        });
        return ds;
      })
      .then(async (ds) => {
        //access to your districts here
        //ds is an arra ofcourse
        //change it to your need here
        //response should be assigned here
        response = `CON choose district for weather report manipulated district response`;
        await console.log(ds);
      });
  } else if (text == "3") {
    response = `CON choose options below for help
		1.call center`;
  }
  //send the response back
  res.set("Content-Type: text/plain");
  res.send(response);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
