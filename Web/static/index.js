function authenticate(){
    console.log("TESTING");
    var tokenId = document.getElementById("frm1");
    localStorage.setItem("Token Id", tokenId.elements[0].value);
}
