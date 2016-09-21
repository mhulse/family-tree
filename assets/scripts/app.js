(function(ns, undefined) {
	
	'use strict';
	
	ns.root = {};
	
	ns.init = function() {
		
		var self = this;
		
		this.root = self;
		
		self.main();
		
	};
	
	ns.main = function() {
		
		new this.panel.create();
		
		this.canvas.init();
		
	};
	
}(
	window.FT = (window.FT || {})
));

$(function() {
	FT.init();
});
