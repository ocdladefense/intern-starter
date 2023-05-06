

// https://www.algolia.com/blog/engineering/how-to-implement-autocomplete-with-javascript-on-your-website/

const SearchClient = (function() {
    function autocompleteMatch(input) {

        let theFilter = function(term) {
            if (term.match(reg)) {
                return term;
            }
        };

        let reg = new RegExp(input);

        return '' == input ? [] : this.list.filter(theFilter);
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

