(function(ns, $, undefined) {
	
	'use strict';
	
	var $canvas = $('#canvas');
	var $grid = $('#grid');
	var $wrap = $('#wrap');
	
	ns.canvas = {};
	
	ns.canvas.init = function() {
		
		this.g2p();
		
		this.fit();
		
	};
	
	ns.canvas.g2p = function() {
		
		var g2p = new GrabToPan({
			element: $canvas[0],
			onActiveChanged: function(isActive) {
				console.log('Grab-to-pan is ' + (isActive ? 'activated' : 'deactivated'));
			}
		});
		
		//g2p.activate();
		
		// https://github.com/Rob--W/grab-to-pan.js/issues/5
		$grid.on('mouseover', function(event) {
			
			if (event.target.id == 'grid') {
				g2p.activate();
			} else {
				g2p.deactivate();
			}
			
		});
		
		return g2p;
		
	};
	
	ns.canvas.fit = function() {
		
		var size = {
			x: 0,
			y: 0
		};
		var person;
		
		$wrap.find('.person').each(function() {
			
			person = $(this);
			
			size.x = Math.max(size.x, person.width() + person.position().left);
			
			size.y = Math.max(size.y, person.height() + person.position().top);
			
		});
		
		$wrap.css({
			width: size.x,
			height: size.y
		});
		
		return size;
		
	};
	
}(
	window.FT = (window.FT || {}),
	jQuery
));
