<!doctype html>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=windows-1252" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js">
        </script>

        
        <link rel="stylesheet" href="node_modules/@ocdladefense/modal/dist/css/loading.css" />
        <link rel="stylesheet" href="node_modules/@ocdladefense/modal/dist/css/modal.css" />
        <link rel="stylesheet" href="css/example.css" />
        <script src="https://kit.fontawesome.com/c2278a45b9.js" crossorigin="anonymous">
        </script>
        <!--
        https://developers.google.com/maps/documentation/geocoding/requests-geocoding
        -->
        
        <script type="module">

            // https://medium.com/streak-developer-blog/the-complexities-of-implementing-inline-autocomplete-for-content-editables-e358c0ed504b
            import Autocomplete from "./node_modules/@ocdladefense/webc-autocomplete/autocomplete.js";
    
            // customElements.define("word-count", WordCount, { extends: "p" });
            customElements.define("webc-autocomplete", Autocomplete);
        </script>
    </head>
    <body tab-index="-1">


        <div class="toolbar">
    
            <div class="toolbar-section toolbar-left">
                <img class="logo" src="https://appdev.ocdla.org/content/images/logo.png" />
            </div>
            <div class="toolbar-section toolbar-right">

                <form id="chapter-search" autocomplete="off" tab-index="-1">
                    <div class="form-item">
                        <label for="query" style="display:none;">Search term</label>
                        <webc-autocomplete id="query" style="display:inline-block; width:275px;" />
                    </div>
                </form>

                <div id="user-area">

                    <a class="login" href="/logout">logout</a>
                    
                    <a id="user-icon" href="https://ocdla--ocdpartial.sandbox.my.site.com/AccountManager" title="Hello ">
                        <svg id="user-widget" width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <circle cx="50" cy="50" r="50" style="fill: rgb(81 100 144);"></circle>
                                <text x="50%" y="50%" font-size="3.0em" fill="#ffffff" text-anchor="middle" stroke="#ffffff" stroke-width="0px" dy=".3em">SA</text>
                            </g>
                        </svg>
                    </a>

                </div><!-- end user-area -->

            </div>
        </div>

        <div class="toc">

            <?php
                $book = $_GET["book"];
                $chapter = $_GET["chapter"];
                include "books/{$book}/toc.html";
            ?>
        </div>


        <div class="document">
                    
            <!-- Template://breadcrumb -->
            <div class="breadcrumb">
                <ul>
                    <li>Books Online</li>
                    <li>DUII Notebook</li>
                </ul>
            </div>

            <div class="chapter">

                <!-- Template://title -->
                <h1 class="chapter-title">Chapter 1: The Offense<i class="fa-sharp fa-regular fa-bookmark"></i></h1>

                <?php
                    include "books/{$book}/chapters/chapter-{$chapter}/authors.html";
                ?>

                

                <?php 
                    $success = @include "books/{$book}/chapters/chapter-{$chapter}/content.html";
                    if(!$success) {
                        include "books/chapter-not-found.html";
                    }
                ?>

            </div>

            

        </div>


        <div class="outline">
            <div class="outline-content">

            </div>
        </div>


        <div id="modal-backdrop">
            <div id="modal">
                <div id="modal-container" style="overflow-y:visible;"> 
                    <div id="modal-body" style="vertical-align:top;">
                        <div id="modal-title-bar">
                            <button style="float:right;" id="close-modal" type="button">X</button>
                            <div id="modal-title-bar-title"></div>
                        </div>
                        <div id="modal-left-nav" class="modal-toc" style="display:inline-block;width:25%; vertical-align:top;overflow-y:auto;overflow-y: auto;position: sticky;max-height: 600px;padding-right:25px;">

                        </div>
                        <div id="modal-content" style="display:inline-block; width:74%; vertical-align:top; overflow-y: auto; overflow-y: auto; max-height: 600px; padding: 35px;">

                        </div>
                    </div>
                </div>
                <div id="loading">
                    <div id="loading-wheel"></div>
                </div>
            </div>  
        </div>
 

    </body>



    <script type="module">

        // https://medium.com/streak-developer-blog/the-complexities-of-implementing-inline-autocomplete-for-content-editables-e358c0ed504b
        import ReadingContext from "./node_modules/@ocdladefense/reading-context/reading-context.js";
        import SearchClient from "./node_modules/@ocdladefense/search-client/search-client.js";
        import Autocomplete from "./node_modules/@ocdladefense/webc-autocomplete/autocomplete.js";
        import "./node_modules/@ocdladefense/html/html.js";
        import domReady from "../node_modules/@ocdladefense/web/src/web.js";

        window.init = init;
        domReady(init);

        async function init() {
            const terms = ['apple', 'cheese', "cantaloupe", 'apple watch', 'apple macbook', 'apple macbook pro', 'iphone', 'iphone 12'];

            
            let foo = await fetch("https://appdev.ocdla.org/search/query?r=ocdla_products&q=duii").then(resp => resp.json());
            foo = foo.map(result => result.title);
            console.log(foo);
            const client = new SearchClient(foo);
            // this.shadowRoot.addEventListener("click",this);
            // this.input.addEventListener("mousedown",this);

            // let searchField = document.createElement("webc-autocomplete");
            // searchField.source(client);
            let autocomplete = document.getElementById("query");
            console.log(autocomplete);
            // autocomplete.addEventListener("keyup",autocomplete);
            autocomplete.source(client);
            autocomplete.addEventListener("search",function(e) {
                // Gets the search terms committed as part of the search.
                // e.detail.terms
            });
            autocomplete.addEventListener("beforedisplayresults",function(e) {

            });
            // document.body.append(searchField);

            document.body.addEventListener("click",function(e) {
                console.log("Body event listener.");
                autocomplete.hide();
            });
        }
    </script>

    
    <script type="module" src="js/init.js"></script> 
        
    <script type="module">

        import domReady from "./node_modules/@ocdladefense/web/src/web.js";

        domReady(doOutline);

        function doOutline() {
            let elems = document.querySelectorAll(".mw-headline");
            let headings = [...elems].map((node) => node.textContent);
            let nodes = headings.map((heading) => {
                let l = heading.match(/Part/) == null ? 2 : 1;
                let h = document.createTextNode(heading);
                let n = document.createElement("div");
                n.setAttribute("class", "outline-item");
                if(1 == l) {
                    n.setAttribute("class", "outline-item outline-item-level-1");
                }
                n.appendChild(h);
                return n;
            });
            nodes.forEach((node) => document.querySelector(".outline-content").appendChild(node));
        }
    </script>


</html>