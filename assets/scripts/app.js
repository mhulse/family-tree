(function(ns, undefined) {
	
	'use strict';
	
	ns.root = {};
	
	ns.init = function() {
		
		console.log('Hello world!');
		
	};
	
}(
	window.FT = (window.FT || {})
));

$(function() {
	FT.init();
});
