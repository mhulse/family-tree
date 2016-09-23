(function(ns, document, undefined) {
	
	'use strict';
	
	ns.util = {};
	
	// Check if passed variable is already a jQuery object; if not, assume it’s a string selector:
	ns.util.cache = function(selector) {
		
		return ( ! (selector instanceof jQuery)) ? $(selector) : selector;
		
	};
	
}(
	window.FT = (window.FT || {}),
	document
));
