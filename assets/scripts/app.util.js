(function(ns, document, undefined) {
	
	'use strict';
	
	ns.util = {};
	
	ns.util.cache = function(element, selector) {
		
		return ((element instanceof jQuery) ? element : $(selector || element));
		
	};
	
}(
	window.FT = (window.FT || {}),
	document
));
