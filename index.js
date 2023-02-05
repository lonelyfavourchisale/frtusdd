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
const ref = db.ref("weather/districts");



const port = process.env.PORT || 3030;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("*", (req, res) => {
  res.send("USSD deployed successfully");
});

app.post("*", (req, res) => {
  let { sessionId, serviceCode, phoneNumber, text, response } = req.body;

   //creating an array of data
   let dataarray=text.split('*');

   //array length
   let dataarraysize=dataarray.length
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
    function responses() {
      ref.on("value", (snapshot) => {
        let districts = [];
        snapshot.forEach((childSnapshot) => {
          datadistrict = ``;
          var datadistrict = `${childSnapshot.val().name}`;
          districts.push(datadistrict);
        });

        const indexDistricts = districts.map(
          (ds, index) => `${index + 1}. ${ds}\n`
        );

        const spliting=indexDistricts.toString().split(',')
        const joiingdistricts=spliting.join('\n')

        response = `CON choose district for weather \n ${joiingdistricts}`;
      });
    }
    responses();
  } 
  
  else if(dataarray[1]=='2' && dataarray[2]!=''){
response=`CON choose weather information category \n
1.actions
2.expected
3.weakly weather`
  }
  else if(dataarray[1]=='2' && dataarray[2]!='' && dataarray[3]=='1'){
    function getactions(){
      var index='/8';
      const actionsref=ref.child(index)
    
      
      actionsref.child('/actions').on("value",(snapshot)=>{
        var actions=[]
        var selector=0
    
        snapshot.forEach(element => {
        actions.push(++selector + '.' + element.val())
        });
        //conerting an array to sting
        var arraytostring=actions.toString()
        var splitactions=arraytostring.split(',')
        var spacedaction=splitactions.join('\n')
    
        response=`CON actions \n ${spacedaction}`
      })
    }
    getactions()
  }

  else if (text == "3") {
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
