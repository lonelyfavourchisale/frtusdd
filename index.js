const app = require('express')()
	const bodyParser = require('body-parser')
	const logger = require('morgan')
	
	const port = process.env.PORT || 3030
	
	app.use(logger('dev'))
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({extended: true}))
	
	app.get('*', (req, res) => {
	res.send('USSD deployed successfully')
	})
	
	app.post('*', (req, res) => {
	let {sessionId, serviceCode, phoneNumber, text,response} = req.body
	 //first 
	 if(text == '') {

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~First request for the FRT main menu~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        response = `CON Welcome to Farm Radio Trust
        1. Register
        2. Main Menu
        3. Help`;
    }
	 //seconds
	 else if(text=='1'){

        response = `CON Welcome to Mlimi Registration services. 
        
        1. Start Registration
        0. Main Menu
        `

    }
	else if(text=='2'){
		response=`CON Mlimi Main Manu
		1. Advesories
		2. Weather reports
		3. Marketing
		4. Account
		5. help`
		
	}
	else if(text=='2*2'){
		response=`END you have requested for weather menu`
	}
	else if(text=='3'){
            
		response=`CON choose options below for help
		1.call center`
	
}
 //send the response back
 res.set('Content-Type: text/plain');
 res.send(response)
})
	
	app.listen(port, () => {
	console.log(`Server running on port ${port}`)
	})