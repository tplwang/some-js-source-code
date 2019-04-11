// get
function getXhr() {
    if (typeof XMLHttpRequest != 'undefined') {
        return new XMLHttpRequest();
    }
}

var xhr = getXhr();

xhr.open("GET", "/get/name");
xhr.send(null);
xhr.onreadystatechange = function(res) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        console.log(JSON.parse(xhr.responseText));
    }
}

// post
var xhr = getXhr();
var stringData = {
    name: 'xxx';
    password: '123'
}
stringData = JSON.stringify(stringData);

xhr.open("POST", "/register");
xhr.setRequestHeader("Content-type", "aplication/x-www-form-urlencoded");
xhr.send(stringData);
xhr.onreadystatechange = function(res) {
    if (xhr.readyState == 4 && xhr.status) {
        console.log(JSON.parse(xhr.responseText));
    }
}