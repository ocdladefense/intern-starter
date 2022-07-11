



let replacer = function(match, p1, p2, offset, string, groups) {
    // console.log(arguments);
    let link = `<a href="#" data-action="show-ors" data-chapter="${groups.chapter}" data-section="${groups.section}">ORS ${groups.chapter}.${groups.section}</a>`;

    return link;
};


function replaceAll(text) {
    let regexp = /ORS\s+(?<chapter>\d{3})\.(?<section>\d{3})/g;
    // let regexp = /ORS\s+(\d{3})/g;

    let parsed = text.replaceAll(regexp, replacer);
   
    return parsed;
}

function matchAll() {
    let regexp = /ORS\s+(?<chapter>\d{3})\.(?<section>\d{3})/g;
    // let foo = "ORS 123.123".matchAll(regexp);
    let results = [...foo];

    // console.log(results);
}