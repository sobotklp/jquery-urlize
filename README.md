jquery-urlize
-------------
[![Build Status](https://travis-ci.org/sobotklp/jquery-urlize.png?branch=master)](https://travis-ci.org/sobotklp/jquery-urlize)

A jQuery library to recognize and rewrite URLs as clickable links

To use
======

jQuery( selector ).urlize()

or, if you just want to work directly with strings,

urlized = jQuery.fn.urlize(myString);

Note
====

If you're running node on OSX and you get a bunch of silly errors, run this:

$ sudo xcode-select --switch /usr/bin
