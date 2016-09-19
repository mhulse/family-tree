(function(ns, document, undefined) {
	
	'use strict';
	
	
	
}(
	window.FT = (window.FT || {}),
	document
));

//----------------------------------------------------------------------

/*
// http://larsjung.de/modplug/
(function($, undefined) {
	'use strict';
	var plugin = {
		statics: {},
		methods: {},
		defaultStatic: $.noop,
		defaultMethod: $.noop
	};
	modplug('ft', plugin);
}(jQuery));
*/

//----------------------------------------------------------------------

/*
(function($, undefined) {
	'use strict';
	$.ft.modplug({
		methods: {
			focusOn: function($object) {
				return this.each(function() {
					var $this = $(this);
					var position = $object.position();
					var area = {
						width: $this.innerWidth(),
						height: $this.innerHeight()
					};
					$this
						.scrollTop(position.top - (area.height / 2) + ($object.height() / 2))
						.scrollLeft(position.left - (area.width / 2) + ($object.width() / 2));
				});
			}
		}
	});
}(jQuery));
*/

//----------------------------------------------------------------------

$(function() {
	
	'use strict';
	
	/*
	(function() {
		
		var $grid = $('#grid');
		var parent = $grid.parent()[0];
		
		$grid.width(parent.scrollWidth);
		$grid.height(parent.scrollHeight);
		
	}());
	*/
	
	//----------------------------------
	
	(function() {
		
		var panel = new Panel();
		
	}());
	
	//----------------------------------
	
	(function() {
		
		var grid = document.getElementById('grid');
		var canvas = document.getElementById('canvas');
		var g2p = new GrabToPan({
			element: canvas,
			onActiveChanged: function(isActive) {
				//console.log('Grab-to-pan is ' + (isActive ? 'activated' : 'deactivated'));
			}
		});
		
		//g2p.activate();
		
		// https://github.com/Rob--W/grab-to-pan.js/issues/5
		grid.addEventListener('mouseover', function(event) {
			
			if (event.target.id == 'grid') {
				g2p.activate();
			} else {
				g2p.deactivate();
			}
			
		});
		
	}());
	
	//----------------------------------
	
	/*
	(function() {
		
		var $canvas = $('#canvas');
		var $user = $('#user');
		
		$canvas.ft('focusOn', $user);
		
	}());
	*/
	
});

//----------------------------------------------------------------------
