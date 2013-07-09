!(function(global) {

var wrap = function($) {
  // Adapted from Django's URLValidator
  // https://github.com/django/django/blob/stable/1.5.x/django/core/validators.py
  var urlPattern = new RegExp('(?:(?:http|ftp)s?://)?' + // optional scheme
    '(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\\.)+(?:[A-Z]{2,6}\\.?|[A-Z0-9-]{2,}\\.?)|' +  // domain
    'localhost|' + // localhost
    '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + // or ipv4
    '\\[?[A-F0-9]*:[A-F0-9:]+\\]?)' + // or ipv6
    '(?::\\d+)?' +  // optional port
    '(?:[/?]?\\S+)?', 'gi');

  var schemelessPattern = new RegExp('href="((?!https?://).*?)"', 'gi');

  function urlize(s) {
    var _s = s.replace(urlPattern, function($1) {
      return '<a target="_blank" href="' + $1 + '">' + $1 + '</a>';
    });

    // If a URL doesn't include a scheme, insert 'http://'
    return _s.replace(schemelessPattern, function($1, $2) {
      return 'href="http://' + $2 + '"';
    });
  }

  $.fn.urlize = function(options) {
    if(typeof options === 'string') {
      return urlize(options);
    }
    return this.each(function() {
       $this = $(this);
       $this.html( urlize($this.html()) );
    });
  };
};

if ( typeof define === "function" && define.amd ) {
  define( "jquery-urlize", ['jquery'], wrap);
} else {
  wrap(global.jQuery);
}
})(this);
