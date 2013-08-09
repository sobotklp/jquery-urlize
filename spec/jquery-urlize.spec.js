requirejs = require('requirejs');
requirejs.config({baseUrl: __dirname + "/../lib"});

require(['jquery', 'jquery-urlize'], function($, sut) {
  describe("jquery-urlize test suite", function() {

    it('empty string', function() {
      $elem = $('<p>');
      expect($elem.urlize().html()).toEqual('');
    });

    it('simple strings', function() {
      expect( $('<p>Hello world</p>').urlize().html()).toEqual('Hello world');
      expect( $('<p><a>Don\'t Escape HTML</a></p>').urlize().html()).toEqual('<a>Don\'t Escape HTML</a>');
      expect( $('<p>http://jquery.com</p>').urlize().html()).toEqual('<a target="_blank" href="http://jquery.com">http://jquery.com</a>');
      expect( $('<p>Children love http://clubpenguin.com</p>').urlize().html()).toEqual('Children love <a target="_blank" href="http://clubpenguin.com">http://clubpenguin.com</a>');
      expect( $.fn.urlize('https://google.com > http://bing.com')).toEqual('<a target="_blank" href="https://google.com">https://google.com</a> > <a target="_blank" href="http://bing.com">http://bing.com</a>');
    });

    it('two identical links', function() {
      expect( $('<p>http://jquery.com same as http://jquery.com</p>').urlize().html()).toEqual('<a target="_blank" href="http://jquery.com">http://jquery.com</a> same as <a target="_blank" href="http://jquery.com">http://jquery.com</a>');
    });

    it('two links with substring', function() {
      expect($.fn.urlize('http://www.youtube.com/watch?v=QH2-TGUlwu4 is hosted on http://www.youtube.com/')).toEqual('<a target="_blank" href="http://www.youtube.com/watch?v=QH2-TGUlwu4">http://www.youtube.com/watch?v=QH2-TGUlwu4</a> is hosted on <a target="_blank" href="http://www.youtube.com/">http://www.youtube.com/</a>');
    });

    it('does not start at beginning of string', function() {
      expect($.fn.urlize('     foo.com')).toEqual('     <a target="_blank" href="http://foo.com">foo.com</a>');
    });

    it('URLs without http:// supported', function() {
      expect($.fn.urlize('docs.djangoproject.com/en/1.5/topics/db/models/')).toEqual('<a target="_blank" href="http://docs.djangoproject.com/en/1.5/topics/db/models/">docs.djangoproject.com/en/1.5/topics/db/models/</a>');
      expect($.fn.urlize('www.failblog.org makes baby giggle')).toEqual('<a target="_blank" href="http://www.failblog.org">www.failblog.org</a> makes baby giggle');
      expect($.fn.urlize('jquery.com > script.aculo.us')).toEqual('<a target="_blank" href="http://jquery.com">jquery.com</a> > <a target="_blank" href="http://script.aculo.us">script.aculo.us</a>');
      expect($.fn.urlize('iheart.bo')).toEqual('<a target="_blank" href="http://iheart.bo">iheart.bo</a>');

    });

    it('URLs with invalid TLDs not supported', function() {
      expect($.fn.urlize('test.lol')).toEqual('test.lol');
      expect($.fn.urlize('iheart.boobies')).toEqual('iheart.boobies');
    });

    it('Invalid URLs not supported', function() {
      expect($.fn.urlize(':D')).toEqual(':D');
    });

    xit('Email addresses not supported', function() {
      expect($.fn.urlize('lewis@gmail.com')).toEqual('lewis@gmail.com');
    });
  });
});
