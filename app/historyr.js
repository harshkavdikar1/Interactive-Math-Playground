const electron = require('electron');
const ipc = electron.ipcRenderer;
const fs = require('fs');

var table = document.getElementById("historyTable")
ipc.send('historyping')
var user_name
ipc.on('sent_history_user_name', function(event, arg){
   user_name = arg;
   console.log(user_name);
   createTable();
})

function createTable()
{

    let data = fs.readFileSync('db_json/history_info.json');
    let history = JSON.parse(data);
    for (var i = history[user_name].length-1; i >= 0 ; i--)
    {
        console.log(history[user_name][i])

        var node_row = document.createElement("TR");

        var node_transaction = document.createElement("TD");
        var textnode_transaction = document.createTextNode(history[user_name][i].transaction);
        node_transaction.appendChild(textnode_transaction);
        node_row.appendChild(node_transaction);

        var node_result = document.createElement("TD");
        var textnode_result = document.createTextNode(history[user_name][i].result);
        node_result.appendChild(textnode_result);
        node_row.appendChild(node_result);

        var node_time = document.createElement("TD");
        var textnode_time = document.createTextNode(history[user_name][i].time);
        node_time.appendChild(textnode_time);
        node_row.appendChild(node_time);

        table.appendChild(node_row);


    }
}
