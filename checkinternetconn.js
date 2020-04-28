//dichiaro ogni quanto eseguire il controllo sullaconnessione a internet
var interval = 1000;

function checkInternet(cb) {
    require('dns').lookup('google.com',function(err) {
        if (err && err.code == "ENOTFOUND") {
            cb(false);
        } else {
            cb(true);
        }
    })
}

// 
setInterval(function() {
    checkInternet(function(isConnected) {
        if (isConnected) {
            // connected to the internet
            document.getElementById('internetconn').innerHTML = 'Server: <img src="./images/internet_status_ok.png" width="24px">';
        } else {
            // not connected to the internet
            document.getElementById('internetconn').innerHTML = 'Server: <img src="./images/internet_status_notok.png" width="24px">'; 
        }   
    })
},interval);


// check if roc server is online
function checkInternetROC(cb) {
    require('dns').lookup('roc.olresultat.se',function(err) {
        if (err && err.code == "ENOTFOUND") {
            cb(false);
        } else {
            cb(true);
        }
    })
}
setInterval(function() {
    checkInternetROC(function(isConnectedROC) {
        if (isConnectedROC) {
            // connected to the internet
            document.getElementById('internetconnroc').innerHTML = 'Server ROC: <img src="./images/internet_status_ok.png" width="24px">';
        } else {
            // not connected to the internet
            document.getElementById('internetconnroc').innerHTML = 'Server ROC: <img src="./images/internet_status_notok.png" width="24px">'; 
        }   
    })
},interval);

