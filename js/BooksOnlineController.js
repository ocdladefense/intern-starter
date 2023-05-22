import { Network } from "../node_modules/@ocdladefense/ors/dist/Network.js";
import { OrsParser } from "../node_modules/@ocdladefense/ors/dist/parser.js";

export {BooksOnlineController};

class BooksOnlineController {

    handleEvent(e) {

        let target = e.target;
        let dataset = target.dataset;
        let action = dataset.action;
        let c = target.dataset.chapter;
        let s = target.dataset.section;


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

        modal.show();
        modal.leftNav(toc);
        modal.html(html);
        modal.title("ORS Chapter " + chapterNum);
        let marker = document.querySelector("#modal #section-" + sectionNum);
        marker.scrollIntoView();
        // modal.titleBar(vols);


        return false;
    }

}