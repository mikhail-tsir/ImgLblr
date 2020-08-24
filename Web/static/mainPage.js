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
