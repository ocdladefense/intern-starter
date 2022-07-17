import { InlineModal } from "../node_modules/@ocdladefense/modal-inline/dist/modal.js";

window.onload = function () {
  var modal = new InlineModal("modal");
  var modalTarget = modal.getRoot();
  var links = document.querySelectorAll('a');
  var mouseOutCb = getMouseLeaveCallback(modalTarget, function () {
    modal.hide();
  });
  var mouseOverCb = getMouseOverCallback(function (x, y, chapter, section) {
    fetchOrs(chapter, section).then(function (html) {
      modal.renderHtml(html);
      modal.show(x, y);
    });
  });
  modalTarget.addEventListener("mouseleave", mouseOutCb);

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("mouseover", mouseOverCb);
    links[i].addEventListener("mouseleave", mouseOutCb);
  }
};

function getMouseOverCallback(fn) {
  return function (e) {
    var target = e.target; //console.log(e);

    var rectangle = target.getBoundingClientRect();
    console.log(rectangle);
    var recW = rectangle.width;
    var recH = rectangle.height; //need to fix this, doesnt work right

    var x = recW + (rectangle.width - e.pageX);
    var y = e.pageY;
    console.log(x, y);
    fn(e.pageX, e.pageY, target.dataset.chapter, target.dataset.section);
  };
}

function getMouseLeaveCallback(compareNode, fn) {
  return function (e) {
    var relatedTarget = e.relatedTarget;

    if (!compareNode.contains(relatedTarget)) {
      fn();
    }
  };
}

function fetchOrs(chapter, section) {
  var url = "index.php?chapter=" + chapter + "&section=" + section;
  return fetch(url).then(function (resp) {
    return resp.arrayBuffer();
  }).then(function (buffer) {
    var decoder = new TextDecoder("iso-8859-1");
    return decoder.decode(buffer);
  });
}
