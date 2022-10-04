function filt() {
    if (document.getElementById("filtlist").style.display === "none") {
        document.getElementById("filtlist").style.display = "block"
    }
    else{
        document.getElementById("filtlist").style.display = "none"
    }
}


function show_rows(input) {
    let id = input.id;
    sendRequest(id, (response)=>{
        let array = JSON.parse(response)
        for (id of array){
            let th  =document.getElementById(id)
           // th.style.visibility = "visible"
            th.style.display = ""
        }
    });
}


function hide_rows(input) {
    if(!input.checked){
        return;
    }
    show_rows(document.getElementById("allbook"));
    let id = input.id;
    sendRequest(id, (response)=>{
        let array = JSON.parse(response);
        for(id of array) {
            let th = document.getElementById(id);
           // th.style.visibility = "hidden";
            th.style.display = "none"
        }
    })
}

function  sendRequest(id, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200)
            callback(this.responseText);
    };
    xhttp.open("GET",`/lib/book/${id}`,true);
    xhttp.send();

}