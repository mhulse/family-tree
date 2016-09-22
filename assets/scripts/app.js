(function(ns, undefined) {
	
	'use strict';
	
	ns.root = {};
	
	ns.init = function() {
		
		this.root = this;
		
		this.main();
		
	};
	
	ns.main = function() {
		
		var position = {};
		
		new this.panel.create();
		
		this.canvas.init();
		
		position = this.person.getPosition('#uid1');
		console.log(position);
		this.canvas.setCenter(position.x, position.y);
		
	};
	
}(
	window.FT = (window.FT || {})
));

$(function() {
	FT.init();
});
