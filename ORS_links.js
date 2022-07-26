//const currentLinks = document.querySelectorAll(".ors-link");
const background = document.getElementById("modal-backdrop");
const links = document.getElementsByClassName("a");

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

//links.addEventListener("mouseover", (event)=> {event.target.modalJr.show()});




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
            window.doc = doc;
          
            //specify we want the doccument to be whats inside the <body> tags
            doc.querySelector("body");

            //createa nodeList of all the <b> elements in the body
            let headings = doc.querySelectorAll("b");
            console.log(headings);

            //create a nodeList of all the <p> elements in the body
            let paragraphs = document.querySelectorAll('p');
            //tocRange = paragraphs.range(12, 10);
            
            var tocHeadings = {};        
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
            chapter = parseInt(chapter);
            section = parseInt(section);
            //highlight(chapter, section, null, doc);
            //why does the range not work if called here?

            const serializer = new XMLSerializer();
            const modified = serializer.serializeToString(doc);

            modal.renderHtml(modified);
            modal.show();
            let newHash = chapter +"." + section;
            window.location.hash = newHash;
            
            
            highlight(chapter, section, null);

                  
        });
        

    return false;
}

function highlight(chapter, section, endSection = null, doc = null){
    let range = doc? doc.createRange(): new Range();
    doc = doc || document;
    
    endSection = endSection || section + 1;
    
    chapter = chapter.toString();
    section = section.toString();
    
    section = padZeros(section);
    endSection = padZeros(endSection);
    
    var start = chapter + '.' + section;
    var end = chapter + '.' + endSection;

    var firstNode = doc.getElementById(start); 
    var secondNode = doc.getElementById(end); 
    range.setStartBefore(firstNode);
    range.setEndBefore(secondNode);

    console.log(range);

    var newParent = doc.createElement('div');
    newParent.setAttribute('style', 'background-color:yellow;');
    range.surroundContents(newParent);

}

function padZeros(section){
    if(section < 10){
        section = '00'+section;
    }
    if(section < 100){
        section = '0'+section;
    }

    return section;
}

function nextSectionId(chapter, section){
    let range = doc? doc.createRange(): new Range();
    doc = doc || document;

    //we want all the heading divs
    var headingDivs = doc.getElementsByTag('div');

    chapter = chapter.toString();
    section = section.toString();

    section = padZeros(section);

    //the starting node for our range
    var start = chapter + '.' + section;
    
    var firstNode = headingDivs.getElementById(start);
    var endNode = headingDivs[firstNode + 1]; 

    console.log(headingDivs);

    range.setStartBefore(firsNode);
    range.setEndBefore(endNode);

    console.log(range);

    

}




/*
DOES NOT WORK
Range {commonAncestorContainer: div.wordsection1, startContainer: p.msonormal, startOffset: 0, endContainer: p.msonormal, endOffset: 0, …}
collapsed: false
commonAncestorContainer: div.wordsection1
endContainer: p.msonormal
endOffset: 0
startContainer: p.msonormal
startOffset: 0
[[Prototype]]: Range
*/
/*
WORKS
Range {commonAncestorContainer: div.WordSection1, startContainer: div.WordSection1, startOffset: 384, endContainer: div.WordSection1, endOffset: 436, …}
collapsed: false
commonAncestorContainer: div.WordSection1
endContainer: div.WordSection1
endOffset: 385
startContainer: div.WordSection1
startOffset: 384
[[Prototype]]: Range
*/