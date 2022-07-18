function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { OrsModal } from "../node_modules/@ocdladefense/ors/dist/modal.js";
import { OrsParser } from "../node_modules/@ocdladefense/ors/dist/ors-parser.js"; // List for ORS-related requests.

document.addEventListener("click", displayOrs); // Convert the document to be ORS-ready.

domReady(function () {
  convert();
  var modal = new OrsModal();
  var background = document.getElementById("modal-backdrop");
  background.addEventListener("click", function (e) {
    var id = e.target.id;

    if (id != "modal-backdrop") {
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
  modal.show(); // Network call.

  var network = fetchOrs(chapter, section);
  return network.then(function (data) {
    var _data = _slicedToArray(data, 3);

    sections = _data[0];
    elements = _data[1];
    html = _data[2];
    var volumes = ["Courts, Or. Rules of Civil Procedure", "Business Organizations, Commercial Code", "Landlord-Tenant, Domestic Relations, Probate", "Criminal Procedure, Crimes", "State Government, Government Procedures, Land Use", "Local Government, Pub. Employees, Elections", "Pub. Facilities & Finance", "Revenue & Taxation", "Education & Culture", "Highways, Military", "Juvenile Code, Human Services", "Pub. Health", "Housing, Environment", "Drugs & Alcohol, Fire Protection, Natural Resources", "Water Resources, Agriculture & Food", "Trade Practices, Labor & Employment", "Occupations", "Financial Institutions, Insurance", "Utilities, Vehicle Code, Watercraft, Aviation, Constitutions"];
    var options = volumes.map(function (v, index) {
      return "<option value=\"".concat(index + 1, "\">Volume ").concat(index + 1, " - ").concat(v, "</option>");
    });
    var optionsHtml = options.join("\n");
    var toc = [];

    for (var s in sections) {
      toc.push("<li><a href=\"#".concat(s, "\">").concat(s, " - ").concat(sections[s], "</a></li>"));
    } // highlight(chapter, section, null, doc);
    // Why does the range not work if called here?


    html = parseOrs(html);
    modal.renderHtml(html, "ors-statutes");
    modal.toc(toc.join("\n"));
    modal.titleBar("Oregon Revised Statutes - <select>" + optionsHtml + "</select><input type='checkbox' id='theHighlighter' name='highlighting' /><label for='theHighligher'>Highlight</label>");
    window.location.hash = padZeros(chapter) + "." + padZeros(section);
    highlight(chapter, section, null);
  });
}

function fetchOrs(chapter, section) {
  return fetch("index.php?chapter=" + chapter + "&section=" + section).then(function (resp) {
    return resp.arrayBuffer();
  }).then(function (buffer) {
    var decoder = new TextDecoder("iso-8859-1");
    return decoder.decode(buffer);
  }).then(function (html) {
    //initialize the parser
    var parser = new DOMParser(); //tell the parser to look for html

    var doc = parser.parseFromString(html, "text/html"); //specify we want the doccument to be whats inside the <body> tags

    doc.querySelector("body"); //createa nodeList of all the <b> elements in the body

    var headings = doc.querySelectorAll("b"); // console.log(headings);

    var sectionTitles = {};
    var sectionHeadings = {};

    for (i = 0; i < headings.length; i++) {
      var boldParent = headings[i];
      var trimmed = headings[i].textContent.trim();
      if (trimmed.indexOf("Note") === 0) continue;
      var strings = trimmed.split("\n");
      var key = void 0,
          val = void 0;
      console.log(strings); // if array has oonly one element,
      // then we know this doesn't follow the traditional statute pattern.

      if (strings.length === 1) {
        key = strings[0];
        val = boldParent.nextSibling ? boldParent.nextSibling.textContent : "";
      } else {
        // otherwise our normal case.
        key = strings[0];
        val = strings[1];
      }

      sectionTitles[key] = val;
      sectionHeadings[key] = boldParent;
    } // Inserts anchors as div tags in the doc.


    for (var prop in sectionTitles) {
      var headingDiv = doc.createElement('div');
      headingDiv.setAttribute('id', prop);
      var target = sectionHeadings[prop];
      target.parentNode.insertBefore(headingDiv, target);
    } // console.log(sectionTitles);
    // console.log(sectionHeadings);
    // chapter = parseInt(chapter);
    // section = parseInt(section);
    // highlight(chapter, section, null, doc);
    // Why does the range not work if called here?


    var serializer = new XMLSerializer();
    var subset = doc.querySelector(".WordSection1");
    return [sectionTitles, sectionHeadings, serializer.serializeToString(subset)];
  });
}
