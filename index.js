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
 //send the response back
 res.set('Content-Type: text/plain');
 res.send(response)
})
	
	app.listen(port, () => {
	console.log(`Server running on port ${port}`)
	})