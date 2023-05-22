import { OrsParser } from "../node_modules/@ocdladefense/ors/dist/parser.js";
import { Network } from "../node_modules/@ocdladefense/ors/dist/Network.js";
import { Modal } from "../node_modules/@ocdladefense/modal/dist/modal.js";
import { InlineModal } from "../node_modules/@ocdladefense/modal/dist/inline-modal.js";
import domReady from "../node_modules/@ocdladefense/web/src/web.js";
import {BooksOnlineController} from "./BooksOnlineController.js";


// List for ORS-related requests.
document.addEventListener("click", new BooksOnlineController());



let inlineModalFired = false;


// Convert the document to be ORS-ready.
domReady(() => convert(".chapter"));
domReady(init);





function convert(selector) {
    var body = document.querySelector(selector);

    var text = body.innerHTML;
    var parsed = OrsParser.replaceAll(text);

    body.innerHTML = parsed;
}


function init() {
    
        // Inline modal initialization.
        window.inlineModal = new InlineModal("inlinem-ors");
    
        // Full-screen modal.
        let modal = new Modal();
        window.modal = modal;
        
        const background = document.getElementById("modal-backdrop");
    
        background.addEventListener("click", function (e) {
    
            let id = e.target.id;
            if (id != "modal-backdrop") {
                return;
            }
            modal.hide();
        });
    

        
        const serializer = new XMLSerializer();
    
        let modalTarget = window.inlineModal.getRoot();
    
    
    
        let mouseOutCb = getMouseLeaveCallback(modalTarget, function () { window.inlineModal.hide(); });
        let mouseOverCb = getMouseOverCallback(async function (x, y, chapterNum, startSection) {
            console.log("X coord is ", x);
            console.log("Y coord is ", y);
            console.log("Chapter is: ", chapterNum);
            console.log("Section is: ", startSection);
    
            // If the modal is already being setup then
            // don't re-initialize.
            if (inlineModalFired == true) {
                return false;
            }
            inlineModalFired = true;
    
    
            window.inlineModal.show(x, y);
    
    
            let chapter = await Network.fetchOrs(chapterNum);
    
            let endSection = chapter.getNextSection("section-"+startSection);
            let cloned = chapter.cloneFromIds(startSection, endSection);
            let html = serializer.serializeToString(cloned);
            console.log(html);
            window.inlineModal.renderHtml(html);
            inlineModalFired = false;
        });
    
    
        modalTarget.addEventListener("mouseleave", mouseOutCb);
    
        let links = document.querySelectorAll("a[data-action]");
    
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("mouseenter", mouseOverCb);
            links[i].addEventListener("mouseleave", mouseOutCb);
        }
}







function getMouseOverCallback(fn) {


    return (function (e) {
        let target = e.target;
        //console.log(e);

        let rectangle = target.getBoundingClientRect();
        let recW = rectangle.width;
        let recH = rectangle.height;

        //need to fix this, doesnt work right
        let x = recW + (rectangle.width - e.pageX);
        if (x > 1575) {
            x = 1575;
        }
        let y = e.pageY;
        fn(e.pageX - 50, e.pageY + 1, target.dataset.chapter, target.dataset.section);

    });
}


function getMouseLeaveCallback(compareNode, fn) {
    return (function (e) {
        let relatedTarget = e.relatedTarget;
        let areTheyEqual = compareNode == relatedTarget;
        console.log("Leave");
        if (areTheyEqual) {
            return false;
        }
        if (!compareNode.contains(relatedTarget)) {
            fn();
        }
    });
}



