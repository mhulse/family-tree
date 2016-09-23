(function(ns, undefined) {
	
	'use strict';
	
	ns.root = {};
	
	ns.debug = true;
	
	ns.init = function() {
		
		this.root = this;
		
		this.main();
		
	};
	
	ns.main = function() {
		
		var position = {};
		
		new this.panel.create();
		
		this.canvas.init();
		
		position = this.person.getPosition('.you');
		
		this.canvas.setCenter(position.x, position.y);
		
		this.plumb.init();
		
	};
	
}(
	window.FT = (window.FT || {})
));

$(function() {
	FT.init();
});
