function authenticate() {
    // Pushing ID to local storage
    var tokenId = document.getElementById("frm1").elements[0].value;
    localStorage.setItem("tokenId", tokenId);
    console.log("tokenId: ",  tokenId);    
}

