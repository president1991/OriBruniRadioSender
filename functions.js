//funzione che restituisce l'ora corretta (eg. 12:01:05)
function getTimeNew(){ 
    var d = new Date();
    var sH = (d.getHours() < 10 ? '0' : '') + d.getHours();
    var sM = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    var sS = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
    var sTime = sH + ':' + sM  + ':' + sS ;
    return sTime;
}
//--------------------------------------------------------



var stringa_log_esterna = '';
//funzioni per l'apped del file log
function Append(stringa){
    if (document.getElementById('log') !== null) // se esiste
    {
        stringa += '\n';
        document.getElementById("log").innerHTML += stringa;
    }
    else
    {
        stringa_log_esterna += stringa;
    }
}
function AppendWONL(stringa){
    if (document.getElementById('log') !== null) // se esiste
    {
        stringa += '\r';
        document.getElementById("log").innerHTML += stringa;
    }
    else
    {
        stringa_log_esterna += stringa;
    }
}

//------------------------------


//Scrivi file CSV
function scrivisuCSV(id,cn,sicard,time){
    var fs = require('fs');
    var csvWriter = require('csv-write-stream');
    
    var csvFilename = 'OriBruniRadioSender_log.csv';

    // If CSV file does not exist, create it and add the headers
    if (!fs.existsSync(csvFilename)) {
        writer = csvWriter({separator:';', sendHeaders: false});
        writer.pipe(fs.createWriteStream(csvFilename));
        writer.write({
            id: 'ID',
            cn: 'ControlNumber',
            sicard: 'Sicard',
            time: 'Tempo'
        });
        writer.end();
    } 

    var writer = csvWriter({separator:';', sendHeaders: false});
    writer.pipe(fs.createWriteStream(csvFilename, {flags: 'a'}));
    writer.write({id,cn,sicard,time});
    writer.end();
}