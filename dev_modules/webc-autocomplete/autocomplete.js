

import ReadingContext from "../reading-context/reading-context.js";
import "../html/html.js";

// Create a class for the element
class Autocomplete extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        
        // Create a shadow root
        const shadow = this.attachShadow({mode: "open"});
    
        // Create text node and add word count to it
        const results = document.createElement("div");
        results.setAttribute("id", "results")
        // text.textContent = "Some content here that used to be word count...";
    
        const input = document.createElement("input");
        input.setAttribute("id","q");
        input.setAttribute("type","text");
        input.setAttribute("style","width:100%;");
        this.input = input;
        // Append it to the shadow root
        // shadow.appendChild(text);

        // Create some CSS to apply to the shadow DOM
        const style = document.createElement("style");
        style.textContent = `
        /* CSS truncated for brevity */
        @import "css/form.css";
        label {
            text-transform:uppercase;
        }
        label, li, input {
            font-family: Arial, sans-serif;
        }
        #results {
            border: 1px dotted #ccc;
            padding: 0px;
            background-color: #fff;
            cursor: pointer;
            font-size: 19px;
            color: rgba(50,50,50,0.8);
            position:absolute;
            min-width:600px;
            width:100%;
            z-index:1;  
        }
          #results ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }
          #results ul li {
            padding: 7px;
          }

          #results ul li:hover {
            background-color: rgba(230,223,231,0.3);
          }`;
        
        // attach the created elements to the shadow DOM
        this.shadowRoot.append(style, input, results);

        input.addEventListener("keyup",this);
        this.shadowRoot.addEventListener("click",this);
        this.shadowRoot.getElementById("results").style.display = "none";
        // this.input.addEventListener("mousedown",this);
    }

    // Show suggestion based on user input.
    handleEvent(e) {
        console.log(e);
        if(!this[e.type]) return;

        this[e.type](e);
    }

    mousedown(e) {
        this.keyup(e);
    }
    click(e) {
        let target = e.target;
        if("LI" == target.nodeName) {
            this.shadowRoot.getElementById("q").value = target.innerHTML;
            this.shadowRoot.getElementById("results").style.display = "none";
            const focus = new Event("focus");
            this.input.dispatchEvent(focus);
            this.input.focus();
            e.stopPropagation();
        } 
        if("INPUT" == target.nodeName) {
            this.keyup(e);
            e.stopPropagation();
        }
    }

    keyup(e) {
        let target = e.target;
        let recent = ["<span class='recent'>Recent searches</span>","foobar","baz","pow"];
        let suggestions = this.src.suggest(target.value);
        
        this.renderHtml(suggestions.length > 3 ? suggestions : recent.concat(suggestions));
    }





    source(src) {
        this.src = src;
    }

    hide() {
        this.shadowRoot.getElementById("results").style.display = "none";
    }
    // Render terms in list format.
    renderHtml(terms) {
        let res = this.shadowRoot.getElementById("results");
        res.style.display = "block";
        res.innerHTML = '';
        terms = terms.map(function(term) { return term.html("li"); });
        res.innerHTML = terms.join("\n").html("ul");
    }

    render() {

        /*return (
            <div id="#results" style="display:block;">

            </div>
        )*/
    }



}








export default Autocomplete;