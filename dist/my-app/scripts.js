function soapRequest(km, poids) {
    var res;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'https://soapserviceinfo802.azurewebsites.net/TodoService.asmx', true);

    // build SOAP request
    var sr =
        '<?xml version="1.0" encoding="utf-8"?>' +
        '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
        '<soap:Body>' +
        '<CalculerFraisDeLivraison xmlns="http://www.xamarin.com/webservices/">' +
        '<km>' + km + '</km>' +
        '<poids>' + poids + '</poids>' +
        '</CalculerFraisDeLivraison>' +
        '</soap:Body>' +
        '</soap:Envelope>';

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                alert(xmlhttp.responseText);
                document.getElementById("ResponseFromSoap").innerHTML = xmlhttp.responseText.substr(328,xmlhttp.responseText.length-328-96);
            }
        }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml; charset=utf-8');
    // send request
    xmlhttp.send(sr);

}

;
//# sourceMappingURL=scripts.js.map