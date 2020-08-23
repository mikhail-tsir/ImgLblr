function download() {
    // Getting items associated with ID
    var id = localStorage.getItem("tokenId");
    console.log(id);
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:5000/images?" + "tokenId=" + id, false);
    xhttp.send(id);
    var data = JSON.parse(xhttp.responseText);
    console.log(data);

    // Download data
    var fileName = 'data.json';
    console.log(fileName);

    // Create a blob of the data
    var fileToSave = new Blob([JSON.stringify(data)], {
        type: 'application/json',
        name: fileName
    });

    // Save the file
    saveAs(fileToSave, fileName);
}