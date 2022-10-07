
function correct(){
    if(document.getElementById("username").value.trim() ===""){
        document.getElementById("err").style.display = "block"
        return false;
    }
    return true;
}
