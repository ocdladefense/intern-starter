

// https://www.algolia.com/blog/engineering/how-to-implement-autocomplete-with-javascript-on-your-website/

const AutoComplete = (function() {
    function autocompleteMatch(input) {
        if (input == '') {
        return [];
        }
        var reg = new RegExp(input)
        return search_terms.filter(function(term) {
            if (term.match(reg)) {
            return term;
            }
        });
    }






    // Should take in list or Promise/callback.
    function AutoComplete(list) {
        this.list = list;
    }

    return AutoComplete;
})();


export default AutoComplete;

