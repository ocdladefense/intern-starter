
const ReadingContext = (function() {



    function fromNode(node) {

        let reader;

        if("INPUT" == node.nodeName) {
            const start = node.selectionStart;
            const end = node.selectionEnd;
            // console.log(start,end);
        
            let value = node.value;

            reader = new ReadingContext(node.value);
        }

        if("TEXTAREA" == node.nodeName) {

        }

        return reader;
    }



    function setCursorAt(pos) {
        this.cursorPos = pos;
    }


    function getWordAt(pos) {


        let foo = this.getContext(pos);
        return foo.nearBy.word;
    }




    function getContext(end) {

        
        // if(!selection) return null;

        let half1 = this.text.substr(0,end+1);
        let half2 = this.text.substr(end+1);
        console.log(half1);
        console.log(half2);

        let reg = /\s/gmis;
        let near1 = [...half1.matchAll(reg)];
        let near2 = [...half2.matchAll(reg)];
        console.log(near1,near2);

        // Last occurrence.
        let nearBefore = (near1.length && near1.pop()) || {index:0};
        // First occurrence.
        let nearAfter = near2.shift() || {index:this.text.length-1};
        console.log(nearBefore,nearAfter);

        let before = (nearBefore && nearBefore.index) || 0;
        let after = (nearAfter && (nearAfter.index+end+1)) || this.text.length;
        console.log(before,after);
        let word = this.text.slice(before,after);

        return {
            start: 0,
            end: this.text.length,
            nearBy: {
                character: '',
                word: word
            }
        };
    }


    function ReadingContext(text) {
        this.text = text;
        this.cursorPos = null;
        this.selection = null;
    }



    /*
    cpos = Cursor Position within the objects context.
    */
    let proto = {
        getWordAt: getWordAt,
        getContext: getContext
    };

    ReadingContext.prototype = proto;
    ReadingContext.fromNode = fromNode;

    return ReadingContext;
})();


export default ReadingContext;