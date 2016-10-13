(function(ns, $, undefined) {
	
	'use strict';
	
	var $tree = $('#tree');
	var $canvas = $('#canvas');
	var $grid = $('#grid');
	var $group = $('#group');
	var $crosshairs = $('<div />', {
		id: 'crosshairs'
	});
	var $dot = $('<div />', {
		id: 'dot'
	});
	
	ns.canvas = {};
	
	ns.canvas.dimensions = {};
	
	ns.canvas.init = function() {
		
		var self = this;
		
		this._private.crosshairs();
		
		this._private.g2p();
		
		this._private.fit(); // Only works if app has pre-populated hard-coded HTML; otherwise, see `trigger.tree` below.
		
		this.dimensions = this._private.dimensions();
		
		this.setCenter(this.dimensions.x, this.dimensions.y);
		
		// Make sure the tree’s container is sized to fit the tree:
		$group.on('trigger.tree', function() {
			
			// Called when a new person is added to the tree:
			self._private.fit();
			
		});
		
	};
	
	ns.canvas.setCenter = function(x, y) {
		
		$canvas
			.scrollTop(y - ($canvas.height() / 2))
			.scrollLeft(x - ($canvas.width() / 2));
		
		if (ns.debug) {
			
			this._private.dot(x, y);
			
		}
		
	};
	
	ns.canvas._private = {};
	
	ns.canvas._private.dot = function(x, y) {
		
		$dot
			.css({
				top: (y - ($dot.height() / 2)),
				left: (x - ($dot.width() / 2))
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
				//console.log('Grab-to-pan is ' + (isActive ? 'activated' : 'deactivated'));
			}
		});
		
		g2p.activate();
		
		// https://github.com/Rob--W/grab-to-pan.js/issues/5
		$canvas.on({
			mouseenter: function() {
				g2p.deactivate();
			},
			mouseleave: function() {
				g2p.activate();
			}
		}, '[person]'); // Any person added to `$canvas`, now, and in the future.
		
		return g2p;
		
	};
	
	ns.canvas._private.fit = function() {
		
		var size = {
			x: 0,
			y: 0
		};
		var person;
		
		$group.find('[person]').each(function() {
			
			person = $(this);
			
			size.x = Math.max(size.x, (person.width() + person.position().left));
			
			size.y = Math.max(size.y, (person.height() + person.position().top));
			
		});
		
		$group.css({
			width: size.x,
			height: size.y
		});
		
		return size;
		
	};
	
}(
	window.FT = (window.FT || {}),
	jQuery
));
