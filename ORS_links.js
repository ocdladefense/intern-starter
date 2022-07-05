const currentLinks = document.querySelectorAll(".ors-link");

for(let i = 0; i < currentLinks.length; i++)
{
    currentLinks[i].addEventListener("click", doTheThing);
}


function doTheThing(e) {
    let target = e.target;
    let id = target.id;
    let parts = id.split("-");
    console.log(parts);
    let chapter = parts[0];
    let section = parts[1];

    fetch("http://127.0.0.1/intern-starter/index.php?chapter="+chapter)
    .then(function(resp) {
        return resp.text();
    })
    .then(function(html) {
        modal.renderHtml(html);
    });
}
