(function(ns, document, undefined) {
	
	'use strict';
	
	ns.template = {};
	
	ns.template.load = function(files, path) {
		
		var $body = $('body');
		var promises = [];
		var template = '';
		
		// Make sure it is an array:
		files = ((_(files).isArray()) ? files : [files]);
		
		path = (path || '');
		
		_(files).each(function(file, index) {
			
			file += ((_(file).indexOf('.html') == -1) ? '.html' : '');
			
			template = (path + file);
			
			// http://stackoverflow.com/a/26253242/922323
			promises.push(
				$.get(template, function(data) {
					
					console.info('Async loading of template complete:', this.url);
					
					$body.append(data);
					
				}).fail(function() {
					
					console.warn('Could not load template:', this.url);
					
				})
			);
			
		});
		
		return $.when.apply(null, promises);
		
	};
	
	ns.template.merge = function(parent, child, target, func) {
		
		var $parent = ns.util.cache(parent);
		
		// If `target` is `undefined`, then use the `parent` as the “target” element:
		var $target = (target ? $parent.find(target) : $parent);
		
		$target[func || 'html'](child);
		
		return $parent;
		
	};
	
	ns.template.get = function(template, data) {
		
		var result = '';
		var $template = ns.util.cache(template);
		
		data = (data || '');
		
		if (template.length) {
			
			result = _.template(
				$template
					.html()
					.trim()
			)({
				data: data
			});
			
		} else {
			
			console.warn('Template fragment (%s) does not exist.', template);
			
		}
		
		return result;
		
	};
	
}(
	window.TREE = (window.TREE || {}),
	document
));
