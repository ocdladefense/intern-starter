

import ReadingContext from "./reading-context/reading-context.js";
import SearchClient from "./search-client/search-client.js";
import "./html/html.js";

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
        text.textContent = count;
    
        // Append it to the shadow root
        shadow.appendChild(text);

        // Create some CSS to apply to the shadow DOM
        const style = document.createElement("style");
        style.textContent = `.wrapper {
        /* CSS truncated for brevity */
        }`;
        
        document.getElementById("q").addEventListener("keyup",suggest);
        // attach the created elements to the shadow DOM
        this.shadowRoot.append(style, wrapper);
    }

    // Show suggestion based on user input.
    suggest(e) {
        let target = e.target;
        let suggestions = client.suggest(target.value);
        render(suggestions);
    }


    // Log suggestions for the current-cursor word.
    currentWord(node) {
        
        let reader = ReadingContext.fromNode(node);
        let word = reader.getWordAt(node.selectionStart);
        
        console.log(word);
        
        let suggestions = client.suggest(word);
        console.log(suggestions);
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




class WordCount extends HTMLParagraphElement {
    constructor() {
        // Always call super first in constructor
        super();
    
        // count words in element's parent element
        // const wcParent = this.parentNode;
        const wcParent = document.getElementById("q");
        function countWords(node){
            // const text = node.innerText || node.textContent;
            const text = node.value; 
            //             let re = /[\s\t\n\.]+/gmis;                       
            return text.trim().split(/\s+/g).filter(a => a.trim().length > 0).length;
        }
    
        const count = `Words: ${countWords(wcParent)}`;
    
        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});
    
        // Create text node and add word count to it
        const text = document.createElement('span');
        text.textContent = count;
    
        // Append it to the shadow root
        shadow.appendChild(text);
    
        // Update count when element content changes
        setInterval(function() {
            const count = `Words: ${countWords(wcParent)}`;
            text.textContent = count;
        }, 200);
    }
}



export default Autocomplete;