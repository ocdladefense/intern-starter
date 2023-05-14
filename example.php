<!doctype html>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=windows-1252" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js">
        </script>

        <link rel="stylesheet" href="css/example.css" />
        <link rel="stylesheet" href="node_modules/@ocdladefense/ors/dist/css/loading.css" />
        <link rel="stylesheet" href="node_modules/@ocdladefense/ors/dist/css/modal.css" />
        <link rel="stylesheet" href="node_modules/@ocdladefense/modal/dist/modal.css" />
        
        <style type="text/css">
            .toc a {
                padding: 8px;
                display: block;
                text-decoration: none;
                color: rgba(0,0,0,0.75);
            }

            .toc {
                display: inline-block;
                width: 35%;
                font-size: 1.1em;
                font-family: sans-serif;
                position: sticky;
                top: 115px;
            }

            .chapter {
                display: inline-block;
                vertical-align: top;
                height: 100%;
                font-family: Arial;
                font-size: 1.1em;
                line-height: 26px;
                color:#666;
            }

            .toolbar {
                background-color: #3a4081;
                padding:8px;
                padding-left:3%;
                padding-right:3%;
                position:fixed; z-index:1; top:0px; left:0px; width:100%; height:60px;
            }

            #chapter-search {
                display: inline-block;
                position: relative;
                left: 28%;
            }
        </style>

        <script type="module">

            // https://medium.com/streak-developer-blog/the-complexities-of-implementing-inline-autocomplete-for-content-editables-e358c0ed504b
            import Autocomplete from "./node_modules/@ocdladefense/webc-autocomplete/autocomplete.js";
    
            // customElements.define("word-count", WordCount, { extends: "p" });
            customElements.define("webc-autocomplete", Autocomplete);
        </script>
    </head>
    <body tab-index="-1">


        <div class="toolbar">
    
            <span style="
            color: #fff;
            -webkit-font-smoothing: antialiased;
            font-family: Arial;
            font-weight: bold;
            vertical-align: middle;
        ">OCDLA</span>

            <form id="chapter-search" autocomplete="off" tab-index="-1">
                <div class="form-item">
                    <label for="query" style="display:none;">Search term</label>
                    <webc-autocomplete id="query" />
                </div>
            </form>
        </div>

        <div class="toc">

                    
            <a href="/DUII_Notebook:Introduction" title="DUII Notebook:Introduction">Introduction</a>
            
                
            <a href="/DUII_Notebook:Chapter_1" title="DUII Notebook:Chapter 1">1 – The Offense, with 2022 Update</a>
            
                
            <a href="/DUII_Notebook:Chapter_2" title="DUII Notebook:Chapter 2">2 – You and Your Client</a>
            
                
            <a href="/DUII_Notebook:Chapter_3" title="DUII Notebook:Chapter 3">3 – The File, with 2022 Update</a>
            
                
            <a href="/DUII_Notebook:Chapter_4" title="DUII Notebook:Chapter 4">4 – Implied Consent Hearings, with 2022 Update</a>
            
                
            <a href="/DUII_Notebook:Chapter_5" title="DUII Notebook:Chapter 5">5 – Discovery</a>
            
                
            <a href="/DUII_Notebook:Chapter_6" title="DUII Notebook:Chapter 6">6 – Diversion, with 2022 Update</a>
            
                
            <a href="/DUII_Notebook:Chapter_7" title="DUII Notebook:Chapter 7">7 – Pretrial Motions</a>
            <a href="/DUII_Notebook:Chapter_8" title="DUII Notebook:Chapter 8">8 – Investigators and Experts</a>
            
                
            <a href="/DUII_Notebook:Chapter_9" title="DUII Notebook:Chapter 9">9 – Field Sobriety Tests, with 2022 Update</a>
            
                
            <a href="/DUII_Notebook:Chapter_10" title="DUII Notebook:Chapter 10">10 – DREs and Cannabis, with 2022 Update</a>
            
                
            <a href="/DUII_Notebook:Chapter_11" title="DUII Notebook:Chapter 11">11 – Breath, Blood &amp; Urine, with 2022 Update</a>
            
                
            <a href="/DUII_Notebook:Chapter_12" title="DUII Notebook:Chapter 12">12 – Violations and Related Charges, with 2022 Update</a>
            
                
            <a href="/DUII_Notebook:Chapter_13" title="DUII Notebook:Chapter 13">13 – MJOA/Mistrials and Objections</a>
            
                
            <a href="/DUII_Notebook:Chapter_14" title="DUII Notebook:Chapter 14">14 – The Defense Case/The State’s Case</a>
            
                
            <a href="/DUII_Notebook:Chapter_15" title="DUII Notebook:Chapter 15">15 – Voir Dire, Opening &amp; Closing</a>
            
                
            <a href="/DUII_Notebook:Chapter_16" title="DUII Notebook:Chapter 16">16 – Jury Instructions</a>
            
                
            <a href="/DUII_Notebook:Chapter_17" title="DUII Notebook:Chapter 17">17 – Sentencing, with 2022 Update</a>
            
                
            <a href="/DUII_Notebook:Chapter_18" title="DUII Notebook:Chapter 18">18 – Appeals</a>


                
            <a href="/images/4/40/2022_Resource_Guide.pdf" class="internal" title="2022 Resource Guide.pdf"> 2022 Resource Guide - part of the DUII Notebook</a> 


        </div>


        <div style="position:relative; display:inline-block; top: 115px; left: 0px; width:60%; vertical-align:top;">
        
            <div class="chapter">


            <div class="ors-example">

                <div class="synopsis">The following is an except from <a target="_new" href="https://libraryofdefense.ocdla.org/Search_and_Seizure:Chapter_1B_Search">Search and Seizure: Chapter 1B - Search</a>.</div>


                <h3>Section F - Invasions of Privacy Interests by Listening</h3>

                <p>Individuals have a cognizable privacy interest in the content of their telephone calls. <i>See</i> <a rel="nofollow" class="external text" href="http://www.oregonlaws.org/ors/133.724">ORS 133.724</a> (setting out requirement that police obtain judicially issued warrant to intercept a telephonic communication). Listening to a cordless telephone conversation on a “scanner” is a search. <a rel="nofollow" class="external text" href="http://scholar.google.com/scholar_case?q=State+v.+Carston/+Sage/+Sage/+Gralla,+323+Or+75,+&amp;hl=en&amp;as_sdt=4,38&amp;case=7250644545103351989&amp;scilh=0"><i>State v. Carston/ Sage/ Sage/ Gralla</i>, 323 Or 75, 913 P2d 709 (1996)</a>. However, a person does not have a privacy interest in records that are kept by a third party that do not reveal the contents of a conversation. <a rel="nofollow" class="external text" href="http://scholar.google.com/scholar_case?q=State+v.+Johnson,+340+Or+319,+&amp;hl=en&amp;as_sdt=4,38&amp;case=16302940737552748233&amp;scilh=0"><i>State v. Johnson</i>, 340 Or 319, 336, 131 P3d 173, 184 (2006)</a> <i>cert den,</i> 549 US 1079 (2006) (“[W]e cannot identify a source of law that establishes that defendant also had some interest in keeping private any records kept by a third party, his cellular telephone provider, respecting his cellular telephone usage.”).
                </p>

                <p>Unless exigent circumstances are present, a court order is required to record a conversation between an undercover police officer or an informant and a suspect. <a rel="nofollow" class="external text" href="http://scholar.google.com/scholar_case?q=State+v.+Miskell,+351+Or+680,&amp;hl=en&amp;as_sdt=4,38&amp;case=16123622206201009497&amp;scilh=0"><i>State v. Miskell</i>, 351 Or 680, 697-98 277 P3d 522 (2012)</a> (citing US Const, Amend IV; Or Const Art 1, § 9; ORS 133.726(7)(b)) (“We conclude that, in <a rel="nofollow" class="external text" href="http://www.oregonlaws.org/ors/133.726">ORS 133.726(7)(b),</a> the phrase ‘circumstances of such exigency that it would be unreasonable to obtain a court order,’ refers to ‘exigent circumstances’ in the specialized legal sense—as it has been used by this court in discussing exceptions to the search warrant requirement under Article I, section 9, and by the federal courts in discussing exceptions to the warrant requirement under the Fourth Amendment.”). However, if a person is informed that they are being recorded no privacy interest is violated. <a rel="nofollow" class="external text" href="http://scholar.google.com/scholar_case?q=State+v.+Wischnofske,+129+Or+App+231&amp;hl=en&amp;as_sdt=4,38&amp;case=17487738855132574811&amp;scilh=0"><i>State v. Wischnofske</i>, 129 Or App 231, 236, 878 P2d 1130 (1994)</a> (the defendant had no privacy interests in statements he made while he was seated alone in back seat of patrol car following his arrest and, thus, tape-recording statements was not a “search” within meaning of State Constitution’s protection against unreasonable searches and seizures; defendant had been arrested and told that his conversations would be recorded and tape recorder was visible on passenger’s side of front seat).
                </p>

                <p>Testimonial responses to field sobriety tests are the product of a constitutionally significant search. <a rel="nofollow" class="external text" href="http://scholar.google.com/scholar_case?q=147+Or+App+469&amp;hl=en&amp;as_sdt=4,38&amp;case=6738511133818205236&amp;scilh=0"><i>State v. Gile</i>, 147 Or App 469, 936 P2d 1008 (1997)</a>.
                </p>
            </div>


            <div class="ors-example">

                <div class="synopsis">The following is an except from <a target="_new" href="https://libraryofdefense.ocdla.org/DUII_Notebook:Chapter_3">The DUII Trial Notebook, Chapter 3</a>.</div>

                <h3>
                    <b>Section D - Rescheduling</b>
                </h3>


                <p>If the need arises to reschedule the hearing date, please note that if the petitioner files the request, the client’s license will be suspended within the time period indicated on the implied consent form. If the officer is unavailable and the hearing is rescheduled, the client’s license ORS 813.440 suspension is withdrawn until the outcome of the hearing. Reasons for allowing the department to reschedule the hearing are covered in ORS 813.440 and includes the inability of the attorney to appear due to the attorney’s illness, vacation or scheduling conflict arising from other court or administrative hearing appearances.
                </p>


                <h3>
                    <b>Section E - Servicemembers</b>
                </h3>


                <p>If the client is in the military, different rules will apply. Pursuant to ORS 183.413(a), a member of the Armed Forces (Army, Navy, Air Force, Marines, Coast Guard and National Guard) may be subject to the protection of the Servicemembers’ Civil Relief Act (SCRA). The SCRA provides certain protections to servicemembers and their dependents, if specific conditions are met. If your client qualifies, he or she may be entitled to have the license suspension matter stayed. You will need to get a copy of the client's service orders as it pertains to the specific condition.
                </p>

            </div>



            </div>
        
        </div>




        <div id="modal-backdrop">&nbsp;</div>
        <div id="modal">
            <div id="modal-container" style="overflow-y:visible;">
                <div id="modal-title-bar">
                    ORS - Oregon Revised Statutes <button style="float:right;" id="close-modal" type="button">X</button>
                    <div id="modal-title-bar-content"></div>
                </div>  
                <div id="modal-content" style="vertical-align:top;">
                    <div id="ors-toc" style="display:inline-block;width:25%; vertical-align:top;overflow-y:scroll;">

                    </div>
                    <div id="ors-statutes" style="display:inline-block; width:70%; vertical-align:top; overflow-y: scroll;">

                    </div>
                <div>
            </div>
            <div id="loading">
                <div id="loading-wheel"></div>
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

        function init() {
            const terms = ['apple', 'cheese', "cantaloupe", 'apple watch', 'apple macbook', 'apple macbook pro', 'iphone', 'iphone 12'];

            const client = new SearchClient(terms);

            
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

    
    <script type="module" src="js/init.js">
    </script> 
        


</html>