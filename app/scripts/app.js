(function(namespace, undefined) {
	
	// addNode('#canvas', '#tmpl-node', {
	// 	name: 'billy',
	// 	'class': 'you'
	// });
	
	// getTemplate('#tmpl-person', {
	// 	name: 'billy',
	// 	'class': 'you'
	// });
	
	namespace.init = function() {
		
		var self = this;
		
		$.when(self.loadTemplates([
			'node',
			'modal',
			'person'
		], 'app/partials/'))
			.then(function() {
				
				console.log('All templates loaded!');
				
				self.main();
				
			})
			.fail(function() {
				
				console.log('Loading of templates failed.');
				
			});
		
	};
	
	namespace.main = function() {
		
		var myTemplate = this.getTemplate('#tpl-person', {
			name: 'billy',
			'class': 'you'
		});
		
		console.log(myTemplate);
		
		this.addTemplate('#canvas', '#tpl-person', {
			name: 'billy',
			'class': 'you'
		});
		
	};
	
}((window.TREE = (window.TREE || {}))));

$(function() {
	var tree = TREE.init();
});
