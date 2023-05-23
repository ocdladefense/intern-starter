import { Network } from "../node_modules/@ocdladefense/ors/dist/Network.js";
import { OrsParser } from "../node_modules/@ocdladefense/ors/dist/parser.js";
import { Modal } from "../node_modules/@ocdladefense/modal/dist/modal.js";

export {BooksOnlineController};

class BooksOnlineController {

    modal = null;


    constructor() {
        // Full-screen modal.
        this.modal = new Modal();
        window.modal = this.modal;
    }

    handleEvent(e) {

        let target = e.target;
        let dataset = target.dataset;
        let action = dataset.action;
        let c = target.dataset.chapter;
        let s = target.dataset.section;

        if ("modal-backdrop" == target.id) {
            this.modal.hide();
        }

        if (!["view-section", "show-ors"].includes(action)) {
            return false;
        }

        e.preventDefault();
        // e.stopPropagation();

        if ("view-section" == action) {

            let marker = document.querySelector("#modal #section-" + s);
            marker.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
            return false;
        }

        if ("show-ors" == action) {
            this.displayOrs(c, s);
            return false;
        }
    }


    async displayOrs(c, s) {

        let chapterNum = parseInt(c);
        let sectionNum = parseInt(s);

        let chapter = await Network.fetchOrs(chapterNum);

        // let vols = Ors.buildVolumes();
        let toc = chapter.buildToc();
        let html = chapter.toString();
        html = OrsParser.replaceAll(html);

        this.modal.show();
        this.modal.leftNav(toc);
        this.modal.html(html);
        this.modal.title("ORS Chapter " + chapterNum);
        let marker = document.querySelector("#modal #section-" + sectionNum);
        marker.scrollIntoView();
        // modal.titleBar(vols);


        return false;
    }

    convert(selector) {
        var body = document.querySelector(selector);

        var text = body.innerHTML;
        var parsed = OrsParser.replaceAll(text);

        body.innerHTML = parsed;
    }

}