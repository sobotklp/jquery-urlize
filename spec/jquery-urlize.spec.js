requirejs = require('requirejs');
requirejs.config({baseUrl: __dirname + "/../src"});

require(['jquery', 'jquery-urlize'], function($, sut) {
  describe("jquery-urlize test suite", function() {

    it('empty string', function() {
      $elem = $('<p>');
      expect($elem.urlize().html()).toEqual('');
    });

    it('simple strings', function() {
      expect( $('<p>Hello world</p>').urlize().html()).toEqual('Hello world');
      expect( $('<p><a>Escape HTML</a></p>').urlize().html()).toEqual('&lt;a&gt;Escape HTML&lt;/a&gt;');
      expect( $('<p>http://jquery.com</p>').urlize().html()).toEqual('<a target="_blank" href="http://jquery.com">http://jquery.com</a>');
      expect( $('<p>Children love http://clubpenguin.com</p>').urlize().html()).toEqual('Children love <a target="_blank" href="http://clubpenguin.com">http://clubpenguin.com</a>');
      expect( $.fn.urlize('http://google.com > http://bing.com')).toEqual('<a target="_blank" href="http://google.com">http://google.com</a> > <a target="_blank" href="http://bing.com">http://bing.com</a>');
    });

    it('two identical links', function() {
      expect( $('<p>http://jquery.com same as http://jquery.com</p>').urlize().html()).toEqual('<a target="_blank" href="http://jquery.com">http://jquery.com</a> same as <a target="_blank" href="http://jquery.com">http://jquery.com</a>');
    });

    it('two links with substring', function() {
      expect($.fn.urlize('http://www.youtube.com/watch?v=QH2-TGUlwu4 is hosted on http://www.youtube.com/')).toEqual('<a target="_blank" href="http://www.youtube.com/watch?v=QH2-TGUlwu4">http://www.youtube.com/watch?v=QH2-TGUlwu4</a> is hosted on <a target="_blank" href="http://www.youtube.com/">http://www.youtube.com/</a>');
    });

    it('URLs without http:// not supported', function() {
      expect($.fn.urlize('failblog.org makes baby giggle')).toEqual('failblog.org makes baby giggle');
    });
  });
});
