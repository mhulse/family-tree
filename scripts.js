$(function() {
	
	var $document = $(document);
	
	var openModal = function() {
		
		var $modal = $('.modal');
		
		$modal.addClass('modal-open');
		
		$document.on('click.modal', '.modal', function(event) {
			
			if ($(event.target).hasClass('modal')) {
				
				$document.off('click.modal', '.modal');
				
				$(this).removeClass('modal-open');
				
			}
			
			
		});
		
		console.log('Opening modal window …');
		
	};
	
	$document.on('click', '.node', function() {
		
		openModal();
		
	});
	
	var addNode = function(target, template, data, func) {
		
		$(target)[func || 'append'](_.template($(template).html())({
			data: data
		}));
		
	};
	
	addNode('#canvas', '#tmpl-node', {
		name: 'billy',
		'class': 'you'
	});
	
});
