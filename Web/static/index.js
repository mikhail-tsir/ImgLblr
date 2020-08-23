function authenticate(){
    console.log("TESTING");

    // Pushing ID to local storage
    var tokenId = document.getElementById("frm1");
    localStorage.setItem("tokenId", tokenId.elements[0].value);
}
