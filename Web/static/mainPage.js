function download() {
    // Getting items associated with ID
    var id = localStorage.getItem("Token Id");
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:8080/images?" + "tokenId=" + id, false);
    xhttp.send(id);
    var data = JSON.parse(xhttp.responseText);

    // Download data
    var fileName = 'myData.json';

    // Create a blob of the data
    var fileToSave = new Blob([JSON.stringify(data)], {
        type: 'application/json',
        name: fileName
    });

    // Save the file
    saveAs(fileToSave, fileName);
}