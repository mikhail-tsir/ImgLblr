//import { saveAs } from 'file-saver';

function download() {
    // Getting items associated with ID
    var id = localStorage.getItem("tokenId");
    console.log("ID:", id);
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:5000/images?" + "tokenId=" + id, false);
    xhttp.send(id);
    var data = JSON.parse(xhttp.responseText);
    console.log("Data:", data);

    // Download data
    var fileName = 'data.json';
    console.log("File name:", fileName);

    // Create a blob of the data
    var fileToSave = new Blob([JSON.stringify(data)], {
        type: 'application/json',
        name: fileName
    });

    // Save the file
    saveAs(fileToSave, fileName);
}

// Function to download data to a file
function saveAs(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.saveAs = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}