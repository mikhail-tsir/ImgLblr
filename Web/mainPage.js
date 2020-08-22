function download() {
    var id = localStorage.getItem("Token Id");
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:8080/images?" + "keyword=" + id, false);
    xhttp.send(id);
    var data = JSON.parse(xhttp.responseText);
}