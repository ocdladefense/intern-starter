import { InlineModal } from "../node_modules/@ocdladefense/modal-inline/dist/modal.js";


window.onload = function() {
    let modal = new InlineModal("modal");

    let modalTarget = modal.getRoot();
    let links = document.querySelectorAll('a');

    let mouseOutCb = getMouseLeaveCallback(modalTarget, function() { modal.hide(); });
    let mouseOverCb = getMouseOverCallback(function(x,y,chapter,section) {
        fetchOrs(chapter,section).then(function(html){
            modal.renderHtml(html);
            modal.show(x, y);
        });
    });

    modalTarget.addEventListener("mouseleave", mouseOutCb);

    for(var i = 0; i<links.length; i++) {
        links[i].addEventListener("mouseover", mouseOverCb);
        links[i].addEventListener("mouseleave", mouseOutCb);
    }
};




function getMouseOverCallback(fn) {


    return (function(e) {
        let target = e.target;
        //console.log(e);

        let rectangle = target.getBoundingClientRect();
        console.log(rectangle);
        let recW = rectangle.width;
        let recH = rectangle.height;

        //need to fix this, doesnt work right
        let x = recW + (rectangle.width - e.pageX);
        let y = e.pageY;
        console.log(x,y);
        fn(e.pageX,e.pageY,target.dataset.chapter,target.dataset.section);
    });
}


function getMouseLeaveCallback(compareNode, fn) {
    
    return (function(e) {
        let relatedTarget = e.relatedTarget;
        
        if(!compareNode.contains(relatedTarget)){
            fn();
        }
    }); 
}


function fetchOrs(chapter,section) {
    let url = "index.php?chapter="+chapter+"&section="+section;
    return fetch(url)
    .then(function (resp) {
        return resp.arrayBuffer();
    })
    .then(function (buffer){
        const decoder = new TextDecoder("iso-8859-1");
        return decoder.decode(buffer);
    });
}

