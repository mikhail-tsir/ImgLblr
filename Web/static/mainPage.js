let button = document.getElementById('downloadbtn');
let id = localStorage.getItem("tokenId");
button.onclick = downloadData;

let previewBtn = document.getElementById('previewbtn');
previewBtn.onclick = preview;

async function downloadData() {
    button.setAttribute("download", "imgdata-"+id+".json");
    console.log("ID:", id);
    button.href="http://127.0.0.1:5000/images?tokenId=" + id;
}


async function preview(type) {
    let response = await fetch('http://127.0.0.1:5000/images?tokenId=' + id);
    let imgdata = await response.json();
    console.log("Data:", imgdata);

     // Download data
     var filename = "imgdata-"+id+".json";
     console.log("File name:", filename);
 
     // Create a blob of the data
     var data = new Blob([JSON.stringify(imgdata)], {
         type: 'application/json',
         name: filename
     });

    var file = new Blob([data]);
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"), url = URL.createObjectURL(file);
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