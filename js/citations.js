
    import domReady from "/node_modules/@ocdladefense/web/src/web.js";



    window.addEventListener("hashchange", function(e) {
        e.preventDefault();
    e.stopPropagation();


    let oldId = e.oldURL.split("#")[1];
    let newId = e.newURL.split("#")[1];

    console.log(newId);
    let newElem = document.getElementById(newId);


    newElem.scrollIntoView({behavior:"smooth", block:"center",inline:"nearest"});//({top: (rect.y + offset),behavior:"smooth"});
        });

    const courts = {
        "Or": "Oregon Supreme Court",
    "Or App": "Oregon Appellate Court",
    "S Ct": "United State Supreme Court"
        };

    const reporters = {
        "S Ct": "3,38",
    "Or": "Oregon Supreme Court",
    "Or App": "Oregon Appellate Court",
    "S Ct": "United State Supreme Court"
        };


    let refContainer = document.querySelector("#all-refs");
    let cites = document.querySelectorAll(".cite");

    domReady(function() {
        formatReferences();

    doRefs();
        });


    function parseRef(ref) {

        let parts = ref.split(" ");
    let vol = parts.shift().trim();
    let page = parts.pop().trim();
    let reporter = parts.join(" ");
    let year = "(2008)";
    return {vol, reporter, page};
        }

    function* getReporters(str) {
        let parts = str.split(/[\,]/).map((ref) => ref.trim());
    parts.shift();
    let yielded = [];
            for (var i = parts.length - 1; i >= 0; i--) {
                if (!isNaN(parts[i].replace(/[\-]/, ""))) {
        yielded.unshift(parts[i]);
    continue;
                }
    else {
        yielded.unshift(parts[i]);

    yield yielded.splice(0).join(", ");
                }
            }
        };

    function formatReferences() {
            for (var i = 0; i < cites.length; i++) {
        let n = cites[i];
    // console.log(n);
    let href = n.getAttribute("href");
    let str = n.innerText;
    let parts = str.split(",");
    let caseName = parts.shift();


    let reporting = [...getReporters(str)].reverse();
    // console.log(reporting);
    let reportingText = reporting.join(", ");


    let query = reporting[0] && reporting[0].split(",")[0];

    // continue;
    // https://scholar.google.com/scholar?as_sdt=3,38&q=+118+S+Ct+1952&hl=en


    let link = n.cloneNode(false);
    let replace = document.createElement("span");
    // href = null;
    href = href || ("https://scholar.google.com/scholar?hl=en&as_sdt=4,38,60,156&q=" + query);
    link.setAttribute("href", href);
    link.setAttribute("target", "_new");
    link.setAttribute("title", "View " + caseName + " in Google Scholar");
    link.setAttribute("references", [caseName, reportingText].join(", "));
    link.setAttribute("id", hashCaseName(caseName));

    // Pennsylvania Dept. Correction v. Yeskey
    link.appendChild(document.createTextNode(caseName));
    replace.appendChild(link);
    replace.appendChild(document.createTextNode(", " + reportingText));
    // console.log(n);
    n.parentNode.replaceChild(replace, n);
            }
        }


    function hashCaseName(name) {
            return name.replaceAll(/[\.\s\']/gis, "");
        }


    function doRefs() {
            const refs = document.querySelectorAll("[references], .cite");

    let container = document.createElement("ul");

    for (var i = 0; i < refs.length; i++) {

        let n = refs[i];
    let id = refs[i].getAttribute("id");
    n.setAttribute("target", "_new");

    let a = document.createElement("a");
    let bullet = document.createElement("li");
    let text = n.getAttribute("references");
    a.setAttribute("class", "reference");
    let label = document.createTextNode(text);
    a.appendChild(label);
    a.setAttribute("href", "#"+n.getAttribute("id"));
    bullet.appendChild(a);
    container.appendChild(bullet);
            }

    refContainer.appendChild(container);
}

