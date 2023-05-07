

import ReadingContext from "../reading-context/reading-context.js";
import "../html/html.js";

// Create a class for the element
class Autocomplete extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    

        // count words in element's parent element
        // const wcParent = this.parentNode;
        const wcParent = document.getElementById("q");
    }

    connectedCallback() {
        
        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});
    
        // Create text node and add word count to it
        const text = document.createElement('span');
        text.setAttribute("id", "result")
        text.textContent = "Some content here that used to be word count...";
    
        // Append it to the shadow root
        // shadow.appendChild(text);

        // Create some CSS to apply to the shadow DOM
        const style = document.createElement("style");
        style.textContent = `.wrapper {
        /* CSS truncated for brevity */
        }`;
        
        document.getElementById("q").addEventListener("keyup",this);
        // attach the created elements to the shadow DOM
        this.shadowRoot.append(style, text);
    }

    // Show suggestion based on user input.
    handleEvent(e) {
        let target = e.target;
        let suggestions = this.src.suggest(target.value);
        this.render(suggestions);
    }


    // Log suggestions for the current-cursor word.
    currentWord(node) {
        
        let reader = ReadingContext.fromNode(node);
        let word = reader.getWordAt(node.selectionStart);
        
        console.log(word);
        
        let suggestions = this.src.suggest(word);
        console.log(suggestions);
    }


    source(src) {
        this.src = src;
    }


    // Render terms in list format.
    render(terms) {
        let res = document.getElementById("result");
        res.innerHTML = '';
        terms = terms.map(function(term) { return term.html("li"); });
        res.innerHTML = terms.join("\n").html("ul");
    }

                /* 
            const story = "This is a story about a friend named bb baggins.";
            document.body.appendChild(document.createTextNode(story));
            // document.writeln(story);
            const reader = new ReadingContext(story);
            let word = reader.getWordAt(10);
            console.log(word);

            window.reader = reader;

            */


}








export default Autocomplete;