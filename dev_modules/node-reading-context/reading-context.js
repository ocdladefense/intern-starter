
const ReadingContext = (function() {

function getWord(node) {

    if("INPUT" == node.nodeName) {
        const start = node.selectionStart;
        const end = node.selectionEnd;
        // console.log(start,end);
    
        let value = node.value;
        return inputText(node);
    }

    // if TEXTAREA

    // content-editable
    if(false) {
        const selection = document.getSelection();
        return contentEditable(node);
    }
}


function contentEditable(node) {

}

function inputText(value) {

    
    // if(!selection) return null;

    let half1 = value.substr(0,end);
    let half2 = value.substr(end);
    // console.log(half1,half2);

    let reg = /\s/gmis;
    let near1 = [...half1.matchAll(reg)];
    let near2 = [...half2.matchAll(reg)];
    // console.log(near1,near2);

    // Last occurrence.
    let nearBefore = near1.pop();
    // First occurrence.
    let nearAfter = near2.unshift();

    let before = (nearBefore && nearBefore.index) || 0;
    let after = (nearAfter && nearAfter.index) || value.length;
    
    let word = value.slice(before,after);

    return context = {
        node: node,
        start: 0,
        end: value.length,
        nearBy: {
            character: '',
            word: word
        }
    };
}


    function ReadingContext(txt) {
        this.text = text;
    }


    function setCursor(index) {


    }

    /*
     cpos = Cursor Position within the objects context.
    */
    let proto = {
        getWord: getWord
    };

    ReadingContext.prototype = proto;

    return ReadingContext;
})();


export default ReadingContext;