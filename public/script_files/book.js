

function correct(){
    if(document.getElementById("author").value.trim() ==="" || document.getElementById("title").value.trim() ==="" || document.getElementById("date").value.trim() ===""){
        document.getElementById("err").style.display = "block"
        return false;
    }
    return true;
}

function dial(){
    document.getElementById("userinf").show()
}