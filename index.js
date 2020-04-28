

var btn_salva = document.getElementById('btn_salva');
btn_salva.addEventListener('click', function(){
    console.log('Salvataggio in corso!');
    savesettings();
 });


var btn_now = document.getElementById('btn_now');
btn_now.addEventListener('click', function(){
    d = new Date().toISOString().split('Z')[0];
    //format yyyy-MM-ddThh:mm
    document.getElementById('startdate').value = d
 });

//btn ROC
var btn_roc_avvia = document.getElementById('btn_roc_avvia');
var btn_roc_stop = document.getElementById('btn_roc_stop');
//functions pulsanti
btn_roc_avvia.addEventListener('click', function(){
    Append('Inizializzo ROC..');

    //Leggo i dati
    //server - raceid- data -lastid
    var server = document.getElementById('server').value;
    var raceid = document.getElementById('raceid').value;
    var startdata = document.getElementById('startdate').value;
    var lastid = document.getElementById('lastid').value;
    Append('Server: ' + server);
    Append('RaceID: ' + raceid);
    startdata = (startdata.split('.'))[0];
    Append('Data: ' + startdata);
    data = startdata.split('T')[0];
    tempo = startdata.split('T')[1];
    Append('Last #: ' +lastid);
    //-----------

    //stringa url richiesta
    //Scarico il file dal ROC Server
    var url = server + "?unitId=" + raceid + "&lastId=" + lastid + "&date=" + data + "&time=" + tempo;
    Append('ULR: '+ url);

    const fetch = require('node-fetch');
    fetch(url)
    .then(res => res.text())
    .then(body => elaboraHTMLROC(body));
    
    //Abilito il punsalte Stop
    btn_roc_avvia.disabled = true;
    btn_roc_stop.disabled = false;
 });


 function elaboraHTMLROC(source){
    //console.log(source);
    try{
        var rows = source.split("\r");
        console.log('Lunghezza: '+ rows.length);
        var lastid = 0;
        for(i=0;i<(rows.length-1);i++)
        {
            stringa = rows[i];
            valori = stringa.split(';');
            tempo = (valori[3].split(' '))[1];
            Append("ID: "+ valori[0].trim() + " CN: " + valori[1] + " Sicard: " + valori[2] + " Time: " + tempo);
            //console.log("ID: "+ valori[0].trim() + " CN: " + valori[1] + " Sicard: " + valori[2] + " Time: " + tempo);
            //setto l'ultimo id letto sul ROC server nella casella lastPunch
            document.getElementById('lastid').value = valori[0]; 
            if(document.getElementById('toCSV').checked == true)
            {
                scrivisuCSV(valori[0].trim(),valori[1],valori[2],tempo);
            }
        }
  
    } catch(err)
    {
        console.error(err);
    }
   
 }

btn_roc_stop.addEventListener('click', function(){
    Append('Fermo ROC..');

    //Abilito il punsalte Start
    btn_roc_avvia.disabled = false;
    btn_roc_stop.disabled = true;
 });
 //------------------------------
 
window.onload = function(){
    Append(stringa_log_esterna);


    //Carico le impostazioni
    /*
    if (settings.scrivisuldb == true)
        document.getElementById('toDB').checked = true;
    else
        document.getElementById('toDB').checked = false;
        */
}