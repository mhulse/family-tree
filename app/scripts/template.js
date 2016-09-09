(function(namespace, undefined) {
	
	namespace.loadTemplates = function(files, path) {
		
		var $body = $('body');
		var templatesLoadedPromise = null;
		
		// Make sure it is an array:
		files = (_(files).isArray()) ? files : [files];
		
		path = path || '';
		
		_(files).each(function(file, index) {
			
			file += (_(file).indexOf('.html') == -1) ? '.html' : '';
			
			// http://stackoverflow.com/a/26253242/922323
			templatesLoadedPromise = $.get(path + file).then(function(data) {
				
				console.info('Async loading of templates complete');
				
				$body.append(data);
				
			}).fail(function() {
				
				console.info('ERROR: Could not load base templates');
				
			});
			
		});
		
		return templatesLoadedPromise;
		
	};
	
	namespace.addTemplate = function(target, template, data, func) {
		
		var result = false;
		var $target = $(target);
		
		func = (func || 'append');
		
		if ($target.length) {
			
			$target[func](
				this.getTemplate(template, data)
			);
			
			result = true;
			
		} else {
			
			console.warn('Target element (%s) does not exist.', target);
			
		}
		
		return result;
		
	};
	
	namespace.getTemplate = function(template, data) {
		
		var result = '';
		var $template = $(template);
		
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
	
}((window.TREE = (window.TREE || {}))));
