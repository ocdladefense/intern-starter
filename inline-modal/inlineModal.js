
        let link = document.getElementById('testLink');
        link.addEventListener("mouseover", onMouseOver);
        function onMouseOver(e){
            let target = e.target;
            //console.log(e);

            let rectangle = target.getBoundingClientRect();
            console.log(rectangle);
            let recW = rectangle.width;
            let recH = rectangle.height;

            //need to fix this, doesnt work right
            let x = recW + (rectangle.width - e.pageX);
            let y = e.pageY;
            fetchOrs().then(function(html){
                modal.renderHtml(html);
                modal.show(x, y);
            });
        }
        link.addEventListener("mouseleave", mouseOut);
        let funBox = document.getElementById('absolute');

        funBox.addEventListener("mouseleave", mouseOut);
        function mouseOut(e){
            let relatedTarget = e.relatedTarget;
            let modalTarget = document.getElementById('absolute');
            if(!modalTarget.contains(relatedTarget)){
                modal.hide();
            }
           
        }


        var modal = {

show: function(x,y){

    if(x && y){
        x = x +'px';
        y= y +'px';
        $('.absolute').css('top', y);
        $('.absolute').css('left', x);
    }



    $('.absolute').css("display","block");
    //setTimeout(() => $('#modal-jr').addClass('box'), 100);
},

hide: function(){
    $('.absolute').css("display", "none");
    //setTimeout(() => $('body').removeClass('has-modal-jr', 100));
},

render: function(vNode){
    document.getElementById('absolute').innerHtml = "";
    document.getElementById('absolute').appendChild(createElement(vNode));
},

renderHtml: function(html){
    document.getElementById('absolute').innerHTML = html;
},

html: function(html){
    this.renderHtml(html);
}   
};
function fetchOrs(){
return fetch("http://localhost/intern-starter/index.php?chapter=813&section=010")
    .then(function (resp) {
        return resp.arrayBuffer();
    })
    .then(function (buffer){
        const decoder = new TextDecoder("iso-8859-1");
        return decoder.decode(buffer);
    });
   
}
    