var modalJr = {
    show: function(){
        $('body').addClass("has-modal-jr");
        setTimeout(() => $('#modal-jr').addClass('box'), 100);
    },

    hide: function(){
        $('#modal-jr').removeClass('box');
        setTimeout(() => $('body').removeClass('has-modal-jr', 100));
    },

    render: function(vNode){
        document.getElementById('modal-jr-content').innerHtml = "";
        document.getElementById('modal-jr-content').appendChild(createElement(vNode));
    },

    renderHtml: function(html){
        document.getElementById('modal-jr-content').innerHTML = html;
    },

    html: function(html){
        this.renderHtml(html);
    }
};