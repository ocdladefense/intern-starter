

// import ReadingContext from "../reading-context/reading-context.js";

// Add handy HTML extensions to the String prototype.
import "../html/html.js";



// Controller for the Autocomplete Web Component.
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
        input.setAttribute("placeholder","search");
        this.input = input;
        // Append it to the shadow root
        // shadow.appendChild(text);

        // Create some CSS to apply to the shadow DOM
        const style = document.createElement("style");
        style.textContent = `
        * {
            box-sizing: border-box;
        }
        input {
            max-width: 100%;
            font-size: inherit;
            padding: 13px;
            border: 1px solid #ddd;
            border-radius: 3px;
        }

        label {
            display: block;
            font-size: 14px;
            font-weight: bold;
            color: rgba(0,0,0,0.5);
            padding: 3px;
            padding-left: 5px;
        }
        label {
            text-transform:uppercase;
        }
        label, li, input {
            font-family: Arial, sans-serif;
        }
        input {
            width: 100%;
            background-color: #e8eaed;
            height: 41px;
        }
        #results {
            border: 1px dotted #ccc;
            padding: 0px;
            background-color: #fff;
            cursor: pointer;
            font-size: 19px;
            color: rgba(50,50,50,0.8);
            position:absolute;
            z-index:1;  
            width: 275px;
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
        let recent = ["<span class='recent'>Recent searches</span>","diversion","resources","felony"];
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