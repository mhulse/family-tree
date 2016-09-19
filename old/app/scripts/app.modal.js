(function(ns, document, undefined) {
	
	'use strict';
	
	var $document = $(document);
	var $modal;
	
	ns.modal = {};
	
	ns.modal.init = function() {
		
		var self = this;
		
		$('body').append(ns.template.get('#tpl-modal'));
		
		$document.on('click', '.person', function(event) {
			
			var target = $(event.target);
			
			self.open(target);
			
		});
		
	};
	
	ns.modal.open = function(target) {
		
		var self = this;
		var gc = function() {
			
			$document.off('click.modal');
			
			$(this).removeClass('modal-open');
			
		};
		
		// Cache or get the jQuery modal window object:
		
		$modal = ns.util.cache($modal, '.modal');
		
		$modal.addClass('modal-open');
		
		$document.on('click.modal', '.modal', function(event) {
			
			if ($(event.target).hasClass('modal')) {
				
				gc.call($modal);
				
			}
			
		});
		
		$document.on('click.modal', 'button', function() {
			
			gc.call($modal);
			
			// Do more robust checking here later …
			ns.tree.add({
				target: target,
				name: $modal.find('input[name="name"]').val(),
				relation: $modal.find('select[name="relation"]').val(),
				sex: $modal.find('input[name="sex"]:checked').val(),
			});
			
		});
		
		console.log('Opening modal window …');
		
	};
	
}(
	window.TREE = (window.TREE || {}),
	document
));
