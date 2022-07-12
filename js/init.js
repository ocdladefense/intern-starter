

// List for ORS-related requests.
document.addEventListener("click", displayOrs);


// Convert the document to be ORS-ready.
domReady(function() {

    convert();

    const background = document.getElementById("modal-backdrop");

    background.addEventListener("click", function(e) {
        
        let id = e.target.id;
        if(id != "modal-backdrop")
        {
            return;
        }
        modal.hide();
    });


    /*
    const body = document.querySelector("div, p, span"); 

    // Loop through all text nodes of a document; 
    // call convert on each one to capture ORS references.
    for(var n of body.childNodes) {
        let newText = convert(n.innerText);
        n.
    }
    */

});




function displayOrs(e) {
    let target = e.target;

    let action = target.dataset && target.dataset.action;

    // If we aren't showing an ORS then bail.
    if(["show-ors"].indexOf(action) === -1) return false;

    // e.preventDefault();
    // e.stopPropagation();

    let chapter = target.dataset.chapter;
    let section = target.dataset.section;

    modal.show();
    // Network call.
    let network = fetchOrs(chapter,section);

    network.then(function(html) {
        html = parseOrs(html);
        modal.renderHtml(html,"ors-statutes");
        
        window.location.hash = (chapter +"." + section);
    });
    

    return false;
}



function fetchOrs(chapter, section) {
    return fetch("index.php?chapter=" + chapter +"&section=" +section)
        .then(function (resp) {
            return resp.arrayBuffer();
        })
        .then(function (buffer){
            const decoder = new TextDecoder("iso-8859-1");
            return decoder.decode(buffer);
        })
        .then(function (html){
            //initialize the parser
            const parser = new DOMParser();

            //tell the parser to look for html
            const doc = parser.parseFromString(html, "text/html");

            //specify we want the doccument to be whats inside the <body> tags
            doc.querySelector("body");

            //createa nodeList of all the <b> elements in the body
            let headings = doc.querySelectorAll("b");
            // console.log(headings);
                      
            var sectionTitles= {};
            var sectionHeadings ={};
            

            for(i = 0 ; i< headings.length; i++){
                let boldParent = headings[i];            
                var trimmed = headings[i].textContent.trim();
                let strings = trimmed.split("\n");
                let key = strings[0];
                let val = strings[1];
                sectionTitles[key] = val;
                sectionHeadings[key] = boldParent;

            }
            for(var prop in sectionTitles){
                var headingDiv = doc.createElement('div');
                headingDiv.setAttribute('id', prop);

                let target = sectionHeadings[prop];
                target.parentNode.insertBefore(headingDiv, target);
            }
            // console.log(sectionTitles);
            // console.log(sectionHeadings);
           
            const serializer = new XMLSerializer();
            const subset = doc.querySelector(".WordSection1");
            return serializer.serializeToString(subset);
        });
}

