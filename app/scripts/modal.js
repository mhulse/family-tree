(function(namespace, document, undefined) {
	
	var $document = $(document);
	
	namespace.openModal = function() {
		
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
	
}((window.TREE = (window.TREE || {}), document)));
