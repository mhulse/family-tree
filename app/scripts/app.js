(function(ns, document, undefined) {
	
	'use strict';
	
	ns.root = {};
	
	ns.init = function() {
		
		var self = this;
		
		this.root = self;
		
		self.template.load([
			'node',
			'modal',
			'person'
		], 'app/partials/')
			.then(function() {
				
				console.log('All templates loaded!');
				
				self.main();
				
			})
			.fail(function() {
				
				console.log('Loading of templates failed.');
				
			});
		
	};
	
	ns.main = function() {
		
		this.modal.init();
		
		this.tree.load();
		
	};
	
}(
	window.TREE = (window.TREE || {}),
	document
));

$(function() {
	TREE.init();
});
