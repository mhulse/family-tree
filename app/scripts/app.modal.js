(function(ns, document, undefined) {
	
	'use strict';
	
	var $document = $(document);
	var $modal;
	
	ns.modal = {};
	
	ns.modal.init = function() {
		
		var self = this;
		
		ns.template.getAndAdd('body', '#tpl-modal');
		
		$document.on('click', '.person', function() {
			
			self.open();
			
		});
		
	};
	
	ns.modal.open = function() {
		
		var self = this;
		var gc = function() {
			
			$document.off('click.modal');
			
			$(this).removeClass('modal-open');
			
		};
		
		// Cache or get the jQuery modal window object:
		$modal = (($modal instanceof jQuery) ? $modal : $('.modal'));
		
		$modal.addClass('modal-open');
		
		$document.on('click.modal', '.modal', function(event) {
			
			if ($(event.target).hasClass('modal')) {
				
				gc.call($modal)
				
			}
			
		});
		
		$document.on('click.modal', 'button', function() {
			
			gc.call($modal);
			
			// Do more robust checking here later …
			ns.tree.add(
				$modal.find('input').val(),
				$modal.find('select option:selected').text()
			);
			
		});
		
		console.log('Opening modal window …');
		
	};
	
}(
	window.TREE = (window.TREE || {}),
	document
));
