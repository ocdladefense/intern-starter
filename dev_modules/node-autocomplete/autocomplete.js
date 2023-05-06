

// https://www.algolia.com/blog/engineering/how-to-implement-autocomplete-with-javascript-on-your-website/

const SearchClient = (function() {
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
    function SearchClient(list) {
        this.list = list;
    }

    let proto = {
        suggest: autocompleteMatch
    };

    SearchClient.prototype = proto;

    return SearchClient;
})();


export default SearchClient;

