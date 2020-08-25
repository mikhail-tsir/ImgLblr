let button = document.getElementById('downloadbtn');
let id = localStorage.getItem("tokenId");
button.onclick = downloadData;

async function downloadData() {
    // Getting items associated with ID
    var id = localStorage.getItem("tokenId");
    button.setAttribute("download", "imgdata-"+id+".json");
    console.log("ID:", id);

    button.href="http://127.0.0.1:5000/images?tokenId=" + id;

    let response = await fetch('http://127.0.0.1:5000/images?tokenId=' + id);
    let data = await response.json();
    
    console.log("Data:", data);
}


function preview(type) {
    var id = localStorage.getItem("tokenId");
    console.log("ID:", id);
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:5000/images?" + "tokenId=" + id, false);
    xhttp.send(id);
    var data = JSON.parse(xhttp.responseText);
    console.log("Data:", data);

     // Download data
     var filename = 'data.json';
     console.log("File name:", filename);
 
     // Create a blob of the data
     var data = new Blob([JSON.stringify(data)], {
         type: 'application/json',
         name: filename
     });

    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.preview = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}