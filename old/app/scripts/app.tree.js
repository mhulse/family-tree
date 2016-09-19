(function(ns, document, undefined) {
	
	'use strict';
	
	ns.tree = {};
	
	ns.tree.load = function() {
		
		var node = ns.template.get('#tpl-node');
		
		var person = ns.template.get('#tpl-person', {
			name: 'Billy G.',
			'class': 'you',
			id: _.uniqueId('uid_')
		});
		
		$('#canvas').html(ns.template.merge(node, person, 'td'));
		
	};
	
	// Merge this with the above ^^^^^:
	ns.tree.add = function(options) {
		
		var node;
		var parents;
		var person = ns.template.get('#tpl-person', {
			name: options.name,
			'class': options.relation,
			id: _.uniqueId('uid_')
		});
		
		switch (options.relation) {
			
			case 'parent':
				
				// NOT COMPLETE!
				
				node = ns.template.get('#tpl-node');
				
				$(options.target.parent('td')).append(
					ns.template.merge(node, options.target.siblings().andSelf().detach(), 'td')
				);
				
				break;
			
			case 'child':
				
				var count;
				var $tr;
				
				node = ns.template.get('#tpl-child');
				
				$tr = $(options.target.parents('tr')).next();
				
				$tr.append(
					ns.template.merge(node, person)
				);
				
				count = $tr.children('td').length;
				
				$(options.target).parent('td').attr('colspan', count);
				
				break;
			
			case 'sibling':
				
				$(options.target.parent('td'))[((options.sex == 'male') ? 'after' : 'before')](
					ns.template.merge(ns.template.get('#tpl-sibling'), person)
				);
				
				break;
			
			case 'spouse':
				
				$('.you')[((options.sex == 'male') ? 'after' : 'before')](
					person
				);
				
				break;
			
			default:
				
				// What to log and where?
			
		}
		
	};
	
}(
	window.TREE = (window.TREE || {}),
	document
));
