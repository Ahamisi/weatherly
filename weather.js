// import api from './api.json';
const https = require('https');
const api = require('./api.json');
const http = require('http');

function printMessage(name,temp,humidity, windSpeed,type){
    const message  =  `Its ${type} in ${name} with a temperature of ${temp}K. There is also an humidity of ${humidity}% with a wind speed of ${windSpeed}`; 
    console.log(message);
}
//print error message
function printError(error){
    console.log(error.message);
}
function get(query){
    try{
        const request = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${api.key}`,res => {
            let result = '';
            if(res.statusCode === 200){
                res.on('data', (data) => {
                    result += data.toString();
                });

                res.on('end', () =>{
                    weatherResult = JSON.parse(result);
                    // console.dir(weatherResult);
                    const speed = `${weatherResult.wind.speed} m/s `;
                    printMessage(weatherResult.name, weatherResult.main.temp, weatherResult.main.humidity, speed, weatherResult.weather[0].main);
                })
            }else{
                const message = `There was an error getting the weather reports for ${query} (${http.STATUS_CODES[res.statusCode]})`;
                const statusCodeError = new Error(message);
                printError(statusCodeError);
            }
        })
    }    
    catch(error){
        printError(error);
    }
}

module.exports.get = get;