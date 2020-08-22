function authenticate(){
    var tokenId = document.getElementById("frm1");
    localStorage.setItem("Token Id", tokenId.elements[0].value);
}
