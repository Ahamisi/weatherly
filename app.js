const app = require('./weather.js');
const report = process.argv.slice(2);
// report.forEach(app.get);
let negative = false;

report.forEach((element,index)=> {
    if(element == 'New'){
        const next = index+=1;
        app.get(`${element} ${report[next]}`);
        negative = true;
    }else if(negative == true){
        negative = false
        return true
    }else{
        app.get(element);
    }
});