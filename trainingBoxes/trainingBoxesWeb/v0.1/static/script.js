leftmenuelem = document.getElementById("menu");
maininfoelem = document.getElementById("text");

function init(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET","/getAboutInfo",false);
    xhr.send(null);
    if (xhr.status == 200) window.aboutInfo = JSON.parse(xhr.responseText);

    var xhr = new XMLHttpRequest();
    xhr.open("GET","/getExperimentsInfo",false);
    xhr.send(null);
    if (xhr.status == 200) window.experimentsInfo = JSON.parse(xhr.responseText);
}

function insertText(fromDict){
    var text = "";
    if (fromDict["text"] != null){
        for(var key = 0; key < fromDict["text"].length; key++){
            text += `<p>${fromDict['text'][key]}</p>`;
        };
    };
    return `<h1>${fromDict['title']}</h1><h3>${fromDict['intro']}</h3>${text}`;
}

function insertImage(fromDict){
    var prereturn = "";
    if (fromDict["imgatr"] != null){
        for(var key = 0; key < fromDict["imgatr"].length; key++){
            prereturn += `<img src=static/media/${fromDict['imgatr'][key]} class=mediacon>`;
        };
    };
    return prereturn;
}

function createPageForExperiments(){
    leftmenuelem.innerHTML = " ";
    maininfoelem.innerHTML = "<h2>Нажмите на опыт слева чтобы просмотреть его</h2>";
    for(var key in window.experimentsInfo){
        var l = document.createElement("div");
        l.innerHTML = window.experimentsInfo[key]["title"];
        oncl = "pasteExperiment('" + key + "')";
        l.setAttribute("onclick",oncl);
        l.setAttribute("id","clickable");
        leftmenuelem.appendChild(l);
    };
};

function createPageForInfo(){
    leftmenuelem.innerHTML = " ";
    maininfoelem.innerHTML = "<h2>Нажмите на вкладку слева чтобы просмотреть информацию</h2>";
    for(var key in window.aboutInfo){
        var l = window.document.createElement("div");
        l.innerHTML = window.aboutInfo[key]["title"];
        oncl = "pasteInfo('" + key + "')";
        l.setAttribute("onclick",oncl);
        l.setAttribute("id","clickable");
        leftmenuelem.appendChild(l);
    };
}

function pasteInfo(page){
    maininfoelem.innerHTML = insertText(window.aboutInfo[page]);
}

function pasteExperiment(elem){
    maininfoelem.innerHTML = insertText(window.experimentsInfo[elem]) + insertImage(window.experimentsInfo[elem]);
};