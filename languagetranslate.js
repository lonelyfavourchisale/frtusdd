const translator = require('translate');
async function languagetranslator(message,translateto){
    translateto.engine ='libre'
    const translatedstring = await translator(message,translateto)
    console.log(translatedstring)
}
languagetranslator('programming is fun','chichewa')