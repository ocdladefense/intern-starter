


export {Http};



const Http = (function() {

        
    function formatQueryString(obj) {
        let params = [];
        for (let prop in obj) {
            let kvp;
            kvp = prop + "=" + obj[prop];
            params.push(kvp);
        };
        return params.join("&");
    }



    return {
        formatQueryString: formatQueryString
    };
})();