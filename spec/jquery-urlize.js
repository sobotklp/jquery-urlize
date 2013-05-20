!(function(global) {

var wrap = function($) {
  // Adapted from Django's URLValidator
  // https://github.com/django/django/blob/stable/1.5.x/django/core/validators.py
  var urlPattern = new RegExp('(?:http|ftp)s?://' + // scheme
    '(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\\.)+(?:[A-Z]{2,6}\\.?|[A-Z0-9-]{2,}\\.?)|' +  // domain
    'localhost|' + // localhost
    '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + // or ipv4
    '\\[?[A-F0-9]*:[A-F0-9:]+\\]?)' + // or ipv6
    '(?::\\d+)?' +  // optional port
    '(?:[/?]\\S+)?', 'ig');

  function urlize(s) {
    matches = s.match(urlPattern);
    if(matches) {
      // uniqify matches
      matches = matches.filter(function (e, i, matches) {
        return matches.lastIndexOf(e) === i;
      });

      // replace matched text
      for(i=0; i<matches.length; i++) {
        matchText = matches[i];
        escapedMatch = matchText.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        newText = '<a target="_blank" href="' + matchText + '">' + matchText + '</a>';
        s = s.replace(new RegExp(escapedMatch, 'g'), newText);
      }
    }
    return s;
  }

  $.fn.urlize = function(options) {
    if(typeof(options) === 'string') {
      return urlize(options);
    }
    return this.each(function() {
       $this = $(this);
       var text = $('<div/>').text($this.html()).html();  // Escape HTML
       $this.html( urlize(text) );
    });
  };
};

if ( typeof define === "function" && define.amd ) {
  define( "jquery-urlize", ['jquery'], wrap);
} else {
  wrap(global.jQuery);
}
})(this);
