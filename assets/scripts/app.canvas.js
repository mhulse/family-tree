(function(ns, $, undefined) {
	
	'use strict';
	
	var $canvas = $('#canvas');
	var $grid = $('#grid');
	var $group = $('#group');
	var $tree = $('#tree');
	var $crosshairs = $('<div />', {
		id: 'crosshairs'
	});
	var $dot = $('<div />', {
		id: 'dot'
	});
	
	ns.canvas = {};
	
	ns.canvas.dimensions = {};
	
	ns.canvas.init = function() {
		
		this._private.crosshairs();
		
		this._private.g2p();
		
		this._private.fit();
		
		this._private.collision();
		
		this.dimensions = this._private.dimensions();
		
		this.setCenter(this.dimensions.x, this.dimensions.y);
		
	};
	
	ns.canvas.setCenter = function(x, y) {
		
		x -= ($canvas.height() / 2);
		y -= ($canvas.width() / 2);
		
		$canvas
			.scrollLeft(x)
			.scrollTop(y);
		
		this._private.dot(x, y);
		
	};
	
	ns.canvas._private = {};
	
	ns.canvas._private.dot = function(x, y) {
		
		$dot
			.css({
				top: y,
				left: x
			})
			.appendTo($grid);
		
	};
	
	ns.canvas._private.crosshairs = function() {
		
		$crosshairs.appendTo($tree);
		
	};
	
	ns.canvas._private.dimensions = function() {
		
		var canvasDom = $canvas[0];
		var width = canvasDom.scrollWidth;
		var height = canvasDom.scrollHeight;
		
		return {
			width: width,
			height: height,
			x: (width / 2),
			y: (height / 2)
		};
		
	};
	
	ns.canvas._private.g2p = function() {
		
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
	
	ns.canvas._private.fit = function() {
		
		var size = {
			x: 0,
			y: 0
		};
		var person;
		
		$group.find('.person').each(function() {
			
			person = $(this);
			
			size.x = Math.max(size.x, person.width() + person.position().left);
			
			size.y = Math.max(size.y, person.height() + person.position().top);
			
		});
		
		$group.css({
			width: size.x,
			height: size.y
		});
		
		return size;
		
	};
	
	ns.canvas._private.collision = function() {
		
		var colliders_selector = "#crosshairs";
		var obstacles_selector = ".person";
		var hits = $(colliders_selector).collision(obstacles_selector);
		
		console.log(hits);
		
	};
	
}(
	window.FT = (window.FT || {}),
	jQuery
));
