(function(ns, document, undefined) {
	
	'use strict';
	
	ns.person = {};
	
	// It is assumed that the person is in a parent, which is within the “work” area.
	ns.person.getPosition = function(person) {
		
		var $person = ns.util.cache(person);
		var position = $person.position(); // Returns top-left corner relative to parent.
		var parentPostion = $person.parent().position(); // IBID.
		
		//console.log($person.parent(), parentPostion);
		
		position.x = ((position.left + ($person.width() / 2)) + parentPostion.left);
		position.y = ((position.top + ($person.height() / 2)) + parentPostion.top);
		
		return position;
		
	};
	
}(
	window.FT = (window.FT || {}),
	document
));
