(function(ns, document, undefined) {
	
	'use strict';
	
	ns.tree = {};
	
	ns.tree.load = function() {
		
		var node = ns.template.get('#tpl-node');
		
		var person = ns.template.get('#tpl-person', {
			name: 'Billy G.',
			'class': 'you'
		});
		
		ns.template.add(
			'#canvas',
			ns.template.merge(node, 'td', person)
		);
		
	};
	
	ns.tree.add = function(name, kind) {
		
		var person = ns.template.get('#tpl-person', {
			name: name,
			'class': 'spouse'
		});
		
		ns.template.add(
			'.you',
			person,
			'after'
		);
		
	};
	
}(
	window.TREE = (window.TREE || {}),
	document
));
