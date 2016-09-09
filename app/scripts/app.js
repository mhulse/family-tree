(function(namespace, undefined) {
	
	namespace.init = function() {
		
		var self = this;
		
		self.loadTemplates([
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
	
	namespace.main = function() {
		
		var node = this.getTemplate('#tpl-node');
		
		var person = this.getTemplate('#tpl-person', {
			name: 'billy',
			'class': 'you'
		});
		
		this.addTemplate(
			'#canvas',
			this.mergeTemplates(node, 'td', person)
		);
		
	};
	
}((window.TREE = (window.TREE || {}))));

$(function() {
	var tree = TREE.init();
});
