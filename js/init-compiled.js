import { OrsModal } from "../node_modules/@ocdladefense/ors/dist/modal.js";
import { OrsParser } from "../node_modules/@ocdladefense/ors/dist/ors-parser.js";
import { InlineModal } from "../node_modules/@ocdladefense/modal-inline/dist/modal.js";
import { domReady } from "../node_modules/@ocdladefense/system-web/SiteLibraries.js";
import { OrsChapter } from "../node_modules/@ocdladefense/ors/src/chapter.js"; // List for ORS-related requests.

document.addEventListener("click", displayOrs);
window.OrsChapter = OrsChapter;
var cache = {};
var inlineModalFired = false; // Convert the document to be ORS-ready.

domReady(function () {
  convert();
  window.modalJr = new InlineModal("modal-jr");
  window.modal = new OrsModal();
  var background = document.getElementById("modal-backdrop");
  background.addEventListener("click", function (e) {
    var id = e.target.id;

    if (id != "modal-backdrop") {
      return;
    }

    modal.hide();
  });
  var serializer = new XMLSerializer();
  var loadingIcon = "<head>\n                             <link rel=\"stylesheet\" href=\"node_modules/@ocdladefense/modal-inline/dist/loading.css\" />\n                         </head>\n                         <div id=\"loading\" class=\"spinner-border\" role=\"status\">\n                             <span id=\"loading-wheel\" class=\"sr-only\">Loading...</span>\n                         </div>";
  var modalTarget = window.modalJr.getRoot();
  var links = document.querySelectorAll('a');
  var mouseOutCb = getMouseLeaveCallback(modalTarget, function () {
    window.modalJr.hide();
  });
  var mouseOverCb = getMouseOverCallback(function (x, y, chapter, section) {
    console.log("rectangle");

    if (inlineModalFired == true) {
      return false;
    }

    inlineModalFired = true;
    var chapterDoc = cache[chapter] || new OrsChapter(chapter);

    if (cache[chapter] == null) {
      window.modalJr.show(x, y); //window.modalJr.renderHtml(loadingIcon);

      chapterDoc.load().then(function () {
        cache[chapter] = chapterDoc;
        chapterDoc.injectAnchors();
        var endSection = chapterDoc.getNextSection(section);
        var cloned = chapterDoc.clone(section, endSection.id);
        var clonedHtml = serializer.serializeToString(cloned);
        window.modalJr.renderHtml(clonedHtml);
        inlineModalFired = false;
      });
    } else {
      window.modalJr.show(x, y);
      var endSection = chapterDoc.getNextSection(section);
      var cloned = chapterDoc.clone(section, endSection.id);
      var clonedHtml = serializer.serializeToString(cloned);
      window.modalJr.renderHtml(clonedHtml);
      inlineModalFired = false;
    }
    /*
    chapterDoc.load().then(function(){  
        
    });
    */

  });
  modalTarget.addEventListener("mouseleave", mouseOutCb);
  var once = {
    once: true
  };

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("mouseenter", mouseOverCb);
    links[i].addEventListener("mouseleave", mouseOutCb);
  }
});

function convert() {
  var body = document.querySelector("body");
  var text = body.innerHTML;
  var parsed = OrsParser.replaceAll(text); // console.log(parsed);

  body.innerHTML = parsed;
}

function displayOrs(e) {
  var target = e.target;
  var action = target.dataset && target.dataset.action; // If we aren't showing an ORS then bail.

  if (["show-ors"].indexOf(action) === -1) return false; // e.preventDefault();
  // e.stopPropagation();

  var chapter = target.dataset.chapter;
  var section = target.dataset.section;
  var chapterNum = parseInt(chapter);
  var sectionNum = parseInt(section);
  ors(chapterNum, sectionNum);
  return false;
}

function ors(chapter, section) {
  // Network call.
  //let network = fetchOrs(chapter,section);
  var chapterDoc = new OrsChapter(chapter);
  chapterDoc.load().then(function () {
    chapterDoc.injectAnchors();
    var endSection = chapterDoc.getNextSection(section);
    chapterDoc.highlight(section, endSection.id);
    var content = chapterDoc.toString();
    modal.renderHtml(content); //modal.show();

    var toc = chapter.buildToC();
    modal.show();
    modal.toc(toc);
    modal.renderHtml(chapter.toString(), "ors-statutes");
  });
}

function getMouseOverCallback(fn) {
  return function (e) {
    var target = e.target; //console.log(e);

    var rectangle = target.getBoundingClientRect();
    var recW = rectangle.width;
    var recH = rectangle.height; //need to fix this, doesnt work right

    var x = recW + (rectangle.width - e.pageX);
    var y = e.pageY;
    fn(e.pageX + 1, e.pageY + 1, target.dataset.chapter, target.dataset.section);
  };
}

function getMouseLeaveCallback(compareNode, fn) {
  return function (e) {
    var relatedTarget = e.relatedTarget;
    var areTheyEqual = compareNode == relatedTarget;
    console.log("Leave");

    if (areTheyEqual) {
      return false;
    }

    if (!compareNode.contains(relatedTarget)) {
      fn();
    }
  };
} //Test building Table of Contents


window.tocTest = tocTest;

function tocTest() {
  var chapter = new OrsChapter(813);
  chapter.load().then(function () {
    chapter.injectAnchors();
    var toc = chapter.buildToC();
    modal.show();
    modal.toc(toc);
    modal.renderHtml(chapter.toString(), "ors-statutes");
    window.location.hash = this.section;
  });
}


window.volTest = volTest;

function volTest() {
  var chapter = new OrsChapter(813);
  chapter.load().then(function () {
    chapter.injectAnchors();
    var toc = chapter.buildToC();
    var vols = chapter.buildVolumes();
    modal.show();
    modal.toc(toc);
    modal.titleBar(vols);
    modal.renderHtml(chapter.toString(), "ors-statutes");
    modal.titleBar(vols);
    window.location.hash = this.section;
  });
}

