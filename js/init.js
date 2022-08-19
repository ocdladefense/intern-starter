import { OrsModal } from "../node_modules/@ocdladefense/ors/dist/modal.js";
import { OrsParser } from "../node_modules/@ocdladefense/ors/dist/ors-parser.js";
import {InlineModal} from "../node_modules/@ocdladefense/modal-inline/dist/modal.js";
import {domReady} from "../node_modules/@ocdladefense/system-web/SiteLibraries.js";
import {OrsChapter} from "../node_modules/@ocdladefense/ors/src/chapter.js"

// List for ORS-related requests.
document.addEventListener("click", displayOrs);

window.OrsChapter = OrsChapter;
const cache = {};
let inlineModalFired = false;
// Convert the document to be ORS-ready.
domReady(function() {

    convert();

    window.modalJr = new InlineModal("modal-jr");

    window.modal = new OrsModal();

    const background = document.getElementById("modal-backdrop");

    background.addEventListener("click", function(e) {
        
        let id = e.target.id;
        if(id != "modal-backdrop")
        {
            return;
        }


        modal.hide();
    });
    
    const serializer = new XMLSerializer();
    const loadingIcon = `<head>
                             <link rel="stylesheet" href="node_modules/@ocdladefense/modal-inline/dist/loading.css" />
                         </head>
                         <div id="loading" class="spinner-border" role="status">
                             <span id="loading-wheel" class="sr-only">Loading...</span>
                         </div>`;
    let modalTarget = window.modalJr.getRoot();
    let links = document.querySelectorAll('a');

    
    let mouseOutCb = getMouseLeaveCallback(modalTarget, function() { window.modalJr.hide(); });
    let mouseOverCb = getMouseOverCallback(function(x,y,chapter,section){
        console.log("rectangle");
        if(inlineModalFired == true)
        {
            return false;
        }
        inlineModalFired = true;

        let chapterDoc = cache[chapter] || new OrsChapter(chapter); 
        if(cache[chapter] == null)
        {
            window.modalJr.show(x,y);
            //window.modalJr.renderHtml(loadingIcon);
            chapterDoc.load().then(function(){

                cache[chapter] = chapterDoc;
                chapterDoc.injectAnchors();
                
                let endSection = chapterDoc.getNextSection(section);
                let cloned = chapterDoc.clone(section, endSection.id);
                let clonedHtml = serializer.serializeToString(cloned);
                window.modalJr.renderHtml(clonedHtml);
                inlineModalFired = false;
            });
        }  
        else
        {
            window.modalJr.show(x,y);
            let endSection = chapterDoc.getNextSection(section);
            let cloned = chapterDoc.clone(section, endSection.id);
            let clonedHtml = serializer.serializeToString(cloned);
            window.modalJr.renderHtml(clonedHtml);
            inlineModalFired = false;
        }
        /*
        chapterDoc.load().then(function(){  
            
        });
        */
    });
    

    modalTarget.addEventListener("mouseleave", mouseOutCb);
    const once = {once: true};
    for(var i = 0; i<links.length; i++) {
        links[i].addEventListener("mouseenter", mouseOverCb);
        links[i].addEventListener("mouseleave", mouseOutCb);
    }

});


function convert() {
    var body = document.querySelector("body");
    
    var text = body.innerHTML;
    var parsed = OrsParser.replaceAll(text);
    // console.log(parsed);

    body.innerHTML = parsed;
}



function displayOrs(e) {
    let target = e.target;

    let action = target.dataset && target.dataset.action;

    // If we aren't showing an ORS then bail.
    if(["show-ors"].indexOf(action) === -1) return false;

    // e.preventDefault();
    // e.stopPropagation();

    let chapter = target.dataset.chapter;
    let section = target.dataset.section;

    let chapterNum = parseInt(chapter);
    let sectionNum = parseInt(section);

    ors(chapterNum, sectionNum);

    return false;
}


function ors(chapter, section) {
     
    // Network call.
    //let network = fetchOrs(chapter,section);
    let chapterDoc = new OrsChapter(chapter);
    chapterDoc.load().then(function (){
        
        chapterDoc.injectAnchors();
        let endSection = chapterDoc.getNextSection(section);
        chapterDoc.highlight(section, endSection.id);

        let content = chapterDoc.toString();
        modal.renderHtml(content);
        modal.show();
    });
}

function getMouseOverCallback(fn) {


    return (function(e) {
        let target = e.target;
        //console.log(e);

        let rectangle = target.getBoundingClientRect();
        let recW = rectangle.width;
        let recH = rectangle.height;

        //need to fix this, doesnt work right
        let x = recW + (rectangle.width - e.pageX);
        let y = e.pageY;
        fn(e.pageX,e.pageY,target.dataset.chapter,target.dataset.section);

    });
}


function getMouseLeaveCallback(compareNode, fn) {
    return (function(e) {
        let relatedTarget = e.relatedTarget;
        let areTheyEqual = compareNode == relatedTarget;
        console.log("Leave");
        if(areTheyEqual)
        {
            return false;
        }
        if(!compareNode.contains(relatedTarget)){
            fn();
        }
    }); 
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
            html = OrsParser.replaceAll(html);
            //tell the parser to look for html
            const doc = parser.parseFromString(html, "text/html");

            

            //createa nodeList of all the <b> elements in the body
            let headings = doc.querySelectorAll("b");
            // console.log(headings);
                      
            window.sectionTitles= {};
            window.sectionHeadings ={};
            

            for(var i = 0 ; i< headings.length; i++){
                let boldParent = headings[i];            
                var trimmed = headings[i].textContent.trim();
                if(trimmed.indexOf("Note") === 0) continue;
                let strings = trimmed.split("\n");
                let chapter, section, key, val;
                console.log(strings);
                // if array has oonly one element,
                // then we know this doesn't follow the traditional statute pattern.
                if(strings.length === 1) {
                    key = strings[0];
                    val = boldParent.nextSibling ? boldParent.nextSibling.textContent : "";
                    
                } else { // otherwise our normal case.
                    key = strings[0];
                    val = strings[1];

                    let numbers = key.split('.');
                    chapter = numbers[0];
                    section = numbers[1];
                }
                console.log(key);
                sectionTitles[parseInt(section)] = val;
                sectionHeadings[parseInt(section)] = boldParent;
            }

            // Inserts anchors as div tags in the doc.
            for(var prop in sectionTitles){
                var headingDiv = doc.createElement('div');
                headingDiv.setAttribute('id', prop);
                headingDiv.setAttribute('class', 'ocdla-heading');
                headingDiv.setAttribute('data-chapter', chapter);
                headingDiv.setAttribute('data-section', prop);

                let target = sectionHeadings[prop];
                target.parentNode.insertBefore(headingDiv, target);
            }
            // console.log(sectionTitles);
            // console.log(sectionHeadings);
           
            // chapter = parseInt(chapter);
            // section = parseInt(section);
            // highlight(chapter, section, null, doc);
            // Why does the range not work if called here?

            

            
            const serializer = new XMLSerializer();
            const subset = doc.querySelector(".WordSection1");
            return [sectionTitles, sectionHeadings, serializer.serializeToString(subset)];
        });
}
window.tocTest = tocTest;
function tocTest(){
    var chapter = new OrsChapter(813);
    chapter.load();
    chapter.toString();
    chapter.injectAnchors();
    chapter.testToC();
}







window.fubar = fubar;
function fubar(){
    var first = getSection(10);
    var second = getNextSection();
    console.log(second);
    var secondThing = parseInt(second.dataset.section);
    OrsParser.highlight(813,10,secondThing);
}

window.getSection = getSection;
function getSection(chapter, section){
    var requestedSec = sectionHeadings[section];
    return requestedSec;
}

window.getNextSection = getNextSection;
function getNextSection(sectionNum){
    var headings = document.querySelectorAll('.ocdla-heading');
    //var vals = ocdlaHeadings.values();
    //console.log(vals[0]);
    var section = document.getElementById(sectionNum);
    

    for(let i=0; i< headings.length; i++){
        if(headings.item(i) == section){
            let nextSection = headings.item(i+1);
            return nextSection;
        }
    }

}



function nextSectionId(chapter, section, doc = null, html){
    let range = doc? doc.createRange(): new Range();
    const parser = new DOMParser();
     doc = parser.parseFromString(html, "text/html");

    
            //createa nodeList of all the <b> elements in the body
            let headings = doc.querySelectorAll("b");
            // console.log(headings);
                      
            var sectionTitles= {};
            var sectionHeadings ={};

    for(var i = 0 ; i< headings.length; i++){
        let boldParent = headings[i];            
        var trimmed = headings[i].textContent.trim();
        if(trimmed.indexOf("Note") === 0) continue;
        let strings = trimmed.split("\n");
        let key, val;
        console.log(strings);
        // if array has oonly one element,
        // then we know this doesn't follow the traditional statute pattern.
        if(strings.length === 1) {
            key = strings[0];
            val = boldParent.nextSibling ? boldParent.nextSibling.textContent : "";
        } else { // otherwise our normal case.
            key = strings[0];
            val = strings[1];
        }
        sectionTitles[key] = val;
        sectionHeadings[key] = boldParent;
    }

    // Inserts anchors as div tags in the doc.
    for(var prop in sectionTitles){
        var headingDiv = doc.createElement('div');
        headingDiv.setAttribute('id', prop);

        let target = sectionHeadings[prop];
        target.parentNode.insertBefore(headingDiv, target);
    }

    //we want all the heading divs
    var headingDivs = doc.querySelectorAll('div');

    //the starting node for our range
    var start = chapter + '.' + section;
    
    var firstNode = headingDivs[start];
    var endNode = headingDivs[firstNode + 1]; 

    console.log(headingDivs);

    range.setStartBefore(firstNode);
    range.setEndBefore(endNode);

    console.log(range);

    

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