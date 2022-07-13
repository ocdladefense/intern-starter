
const patterns = [
    /ORS\s+(?<chapter>\d+)\.(?<section>\d+)(?:\s?\((?<subsection>[0-9a-zA-Z]{1,3})\))*/g,
    // /ORS\s+(?<chapter>\d+)\.(?<section>\d+)/g,
    // /(?<!ORS\s+\d+)((?<chapter>\d+)\.(?<section>\d+))/g
    /(?:\d{4}\s)*c\.(?<chapter>\d+)\s+§+(?<section>\d+,*\s?)+/g
];

const replacers = [

];
let replacer = function(match, p1, p2, offset, string, g) {
    // console.log(arguments);
    let length = arguments.length -3;
    let memorized = Array.prototype.slice.call(arguments, length);
    let groups = memorized.pop();
    // console.log(groups);
    let subsection = groups.subsection ? `(${groups.subsection})` : "";

    let link = `<a href="#" data-action="show-ors" data-chapter="${groups.chapter}" data-section="${groups.section}" data-subsection="${subsection}">ORS ${groups.chapter}.${groups.section}${subsection}</a>`;

    return link;
};


function replaceAll(text) {
    
    // let regexp = /ORS\s+(\d{3})/g;
    for(var regexp of patterns) {
        text = text.replaceAll(regexp, replacer);
        // console.log(text);
    }
    
    return text;
}


function parseOrs(text) {
    let linked = replaceAll(text);
    // "123.123&nbsp;&nbsp;&nbsp;&nbsp;"
    let foo = linked.replaceAll(/(?<chapter>\d{3})\.(?<section>\d{3})(?<spaces>\s{4,})/g, function(match,p1,p2,p3,offset,string,groups){
        return `<a href="#${groups.chapter}.${groups.section}" data-action="ors-nav" data-chapter="${groups.chapter}" data-section="${groups.section}">${groups.chapter}.${groups.section}</a>${groups.spaces}`;
    });

    return foo;
}



function matchAll() {
    let regexp = /ORS\s+(?<chapter>\d{3})\.(?<section>\d{3})/g;
    // let foo = "ORS 123.123".matchAll(regexp);
    let foo = "1987 c.833 §3; 1989 c.453 §2; 1993 c.186 §4; 1995 c.102 §1; 1999 c.448 §1; 1999 c.599 §1; 2021 c.539 §109".matchAll(/\d{4}\s+c\.\d{3}\s+§\d+/g);
    let results = [...foo];

    console.log(results);
}