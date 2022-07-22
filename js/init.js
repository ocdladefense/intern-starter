
import { OrsModal } from "../node_modules/@ocdladefense/ors/dist/modal.js";
import { OrsParser } from "../node_modules/@ocdladefense/ors/dist/ors-parser.js";
import {InlineModal} from "../node_modules/@ocdladefense/modal-inline/dist/modal.js";
import {domReady} from "../node_modules/@ocdladefense/system-web/SiteLibraries.js";


// List for ORS-related requests.
document.addEventListener("click", displayOrs);


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
    modal.show();
    // Network call.
    let network = fetchOrs(chapter,section);

    return network.then(function(data) {
        let sections,elements,html;
        [sections,elements,html] = data;
        let volumes = ["Courts, Or. Rules of Civil Procedure",
        "Business Organizations, Commercial Code",
        "Landlord-Tenant, Domestic Relations, Probate",
        "Criminal Procedure, Crimes",
        "State Government, Government Procedures, Land Use",
        "Local Government, Pub. Employees, Elections",
        "Pub. Facilities & Finance",
        "Revenue & Taxation",
        "Education & Culture",
        "Highways, Military",
        "Juvenile Code, Human Services",
        "Pub. Health",
        "Housing, Environment",
        "Drugs & Alcohol, Fire Protection, Natural Resources",
        "Water Resources, Agriculture & Food",
        "Trade Practices, Labor & Employment",
        "Occupations",
        "Financial Institutions, Insurance",
        "Utilities, Vehicle Code, Watercraft, Aviation, Constitutions"];

        let options = volumes.map(function(v,index){ return `<option value="${index+1}">Volume ${index+1} - ${v}</option>`});
        let optionsHtml = options.join("\n");

        let toc = [];

        for(let s in sections) {
            toc.push(`<li><a href="#${s}">${s} - ${sections[s]}</a></li>`);
        }



        
        // highlight(chapter, section, null, doc);
        // Why does the range not work if called here?

        html = OrsParser.replaceAll(html);
        modal.renderHtml(html,"ors-statutes");
        modal.toc(toc.join("\n"));
        modal.titleBar("Oregon Revised Statutes - <select>"+optionsHtml+"</select><input type='checkbox' id='theHighlighter' name='highlighting' /><label for='theHighligher'>Highlight</label>");
        window.location.hash = (OrsParser.padZeros(chapter) + "." + OrsParser.padZeros(section));

        OrsParser.highlight(chapter, section, null);
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

            //tell the parser to look for html
            const doc = parser.parseFromString(html, "text/html");

            //specify we want the doccument to be whats inside the <body> tags
            doc.querySelector("body");

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

