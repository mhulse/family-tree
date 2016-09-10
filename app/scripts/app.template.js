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
	
	ns.template.merge = function(parent, target, child, func) {
		
		var $parent = ((parent instanceof jQuery) ? parent : $(parent));
		
		$parent.find(target)[func || 'html'](child);
		
		return $parent;
		
	};
	
	ns.template.add = function(target, template, func) {
		
		var result = false;
		var $target = ((target instanceof jQuery) ? target : $(target));
		
		func = (func || 'append');
		
		if ($target.length) {
			
			$target[func](template);
			
			result = true;
			
		} else {
			
			console.warn('Target element (%s) does not exist.', target);
			
		}
		
		return result;
		
	};
	
	ns.template.getAndAdd = function(target, template, data, func) {
		
		return this.add(target, this.get(template, data), func);
		
	};
	
	ns.template.get = function(template, data) {
		
		var result = '';
		var $template = ((template instanceof jQuery) ? template : $(template)); // Test if already a jQuery object.
		
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
