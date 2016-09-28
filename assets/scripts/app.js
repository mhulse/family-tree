(function(ns, undefined) {
	
	'use strict';
	
	ns.root = {};
	
	ns.debug = false;
	
	ns.init = function() {
		
		this.root = this;
		
		this.main();
		
	};
	
	ns.main = function() {
		
		var $self = this;
		var position;
		
		new this.panel.create();
		
		// ORDER MATTERS!
		this.canvas.init();
		this.plumb.init();
		this.tree.init();
		
		// Center on `.you`; default to canvas center:
		position = (($('.you').length) ? this.person.getPosition('.you') : this.canvas.dimensions);
		
		this.canvas.setCenter(position.x, position.y);
		
		$('#group').on('trigger.submit', function() {
			
			$self.plumb.draw();
			
		});
		
	};
	
}(
	window.FT = (window.FT || {})
));

$(function() {
	FT.init();
});
