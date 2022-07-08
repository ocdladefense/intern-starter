const currentLinks = document.querySelectorAll(".ors-link");
const background = document.getElementById("modal-backdrop");

for(let i = 0; i < currentLinks.length; i++)
{
    currentLinks[i].addEventListener("click", doTheThing);
}
background.addEventListener("click", function(e)
{
    let id = e.target.id;
    if(id != "modal-backdrop")
    {
        return;
    }
    modal.hide();
});

function doTheThing(e) {
    let target = e.target;
    let id = target.id;
    let parts = id.split("-");
    console.log(parts);
    let chapter = parts[0];
    let section = parts[1];

    e.preventDefault();
    e.stopPropagation();



    fetch("index.php?chapter="+chapter)
    .then(function(resp) {
        return resp.arrayBuffer();
    })
    .then(function(buffer) {
        const decoder = new TextDecoder("iso-8859-1");
        return decoder.decode(buffer);
    })
    .then(function(html) {
        modal.renderHtml(html);
        modal.show();
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