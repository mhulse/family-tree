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
		
		if (this.debug) {
			
			$('html').addClass('debug');
			
		}
		
		new this.panel.create();
		
		// ORDER MATTERS!
		this.canvas.init();
		this.plumb.init();
		this.tree.init();
		this.person.centerOnYou();
		
		$('#group').on('trigger.submit', function() {
			
			$self.plumb.draw();
			
			$self.person.centerOnYou();
			
		});
		
	};
	
}(
	window.FT = (window.FT || {})
));

$(function() {
	FT.init();
});
