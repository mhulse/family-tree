(function(ns, undefined) {
	
	'use strict';
	
	ns.root = {};
	
	ns.debug = false;
	
	ns.init = function() {
		
		this.root = this;
		
		this.main();
		
	};
	
	ns.main = function() {
		
		var position = {};
		
		new this.panel.create();
		
		this.tree.init();
		
		this.canvas.init();
		
		// Center on `.you`; default to canvas center:
		position = ($('.you').length) ? this.person.getPosition('.you') : this.canvas.dimensions;
		
		this.canvas.setCenter(position.x, position.y);
		
		this.plumb.init();
		
	};
	
}(
	window.FT = (window.FT || {})
));

$(function() {
	FT.init();
});
