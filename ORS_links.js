//const currentLinks = document.querySelectorAll(".ors-link");
const background = document.getElementById("modal-backdrop");


window.onload = function(){
    const paragraphs = document.getElementsByTagName("p");
    const re = /(\d{3})\.(\d{3})/g;

    applyLinks(paragraphs, re);
};

document.addEventListener("click", doTheThing);

background.addEventListener("click", function(e)
{
    let id = e.target.id;
    if(id != "modal-backdrop")
    {
        return;
    }
    modal.hide();
});


function applyLinks(paragraphs, re)
{ 
    for(let i = 0; i < paragraphs.length; i++)
    {
        let para = paragraphs[i];
        let text = para.innerHTML;
        //let matches = [...text.matchAll(re)];
        //console.log(matches);
        let newText = text.replaceAll(re, function(match, p1, p2){
            let id = p1 + "." + p2;
            console.log(match); 
            //return '<a id="'+p1+"-"+p2+'" class="ors-link" href="#">'+p1+"-"+p2+'</a>';
            return `<a data-chapter="${p1}" data-section="${p2}" class="ors-link" href="#">${id}</a>`;
        });
        para.innerHTML = newText;
        //console.log(newText);
        
            
            //let link = document.createElement("a id="textArray[i]" class="ors-link" href="#"");
            
        
    }
    
}



function doTheThing(e) {
    

    let target = e.target;
    if(target.dataset.chapter == null || target.dataset.section == null)
    {
        return;
    }
    /*
    let id = target.dataset.id;
    let parts = id.split("-");
    if(parts.length < 2)
    {
        return;
    }
    console.log(parts);
    */
    let chapter = target.dataset.chapter;
    let section = target.dataset.section;
    console.log(chapter);
    console.log(section);
    e.preventDefault();
    e.stopPropagation();

    
    fetch("index.php?chapter=" + chapter +"&section=" +section)
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
            console.log(headings);
                      
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
            console.log(sectionTitles);
            console.log(sectionHeadings);
           
            const serializer = new XMLSerializer();

            const modified = serializer.serializeToString(doc);

            modal.renderHtml(modified);
            modal.show();
            let newHash = chapter +"." + section;
            window.location.hash = newHash;
            

            //modal.renderHtml(html);

            /* Prints all the contents of <b> elements as text to the console
            for(let head of headings){                         
                console.log(head.textContent);
            }
            for(i=0; i< headings.length; i++){
                var headingDiv = doc.createElement('div id='+secObj.key);
                let boldParent = headings[i];
                 boldParent.insertBefore()
                
            }
            
               //test we are getting the right heading, iterates through the nodeList, logs items that conatin the chapter
            for(let i = 0; i<headings.length; i++){
            if(headings[i].textContent.indexOf(section)!= -1){
                console.log(headings[i].textContent);
                var found = headings[i];
                
            }
            }


            var newArr = [];
            for(let i = 0; i<headings.length; i++){
                newArr.push(headings[i].textContent);
            }
            console.log(newArr);

            var secObj = {};

            for(i=0; i<newArr.length; i++){
                var trimmed = newArr[i].trim();
                let strings = trimmed.split("\n");
                let key =strings[0];
                let val =strings[1];
                secObj[key] = val;                           
            }
            console.log(secObj);
            */

            /*
            THESE DONT WORK

            let headings = doc.querySelectorAll("span > b");
            console.log(headings);
            let head = doc.querySelector("style['font-size:12.0pt;font-family:\"Times New Roman\",serif'");
            console.log(head);

            
            let docBody = doc.querySelector("body");
            let headings = docBody.querySelectorAll("<b></b>");
            let heading = docBody.querySelector("<span style=\"font-size:12.0pt;font-family:\"Times New Roman\",serif\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 813.010 Driving under the influence of intoxicants; penalty.</span>")
            

            for(i = 0; i <headings.length; i++)
            modal.renderHtml(headings[i]);
            */
           
        });

    return false;
}


/*
fetch("?chapter=313&section=005")
.then
.then(function(html)) {



    let parser = new DOMParser();
    let doc = parser.parseFromString(html,"text/html");

    doc.querySelector("body");

    // get an array of all section headings:
    let headings = doc.querySelectorAll("b span");


    


}
*/