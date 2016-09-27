/* jshint esversion:6, unused:false, laxbreak:true */
/* global $, jsPlumb */
(function(ns, document, undefined) {
	
	'use strict';
	
	ns.plumb = {};
	
	ns.plumb.init = function() {
		
		this._private.proxii();
		
		this._private.plumb();
		
	};
	
	ns.plumb._private = {};
	
	ns.plumb._private.draw = function() {
		
		var parentOverrides = {
			connector: 'Straight',
			anchor: 'AutoDefault'
		};
		var childrenOverrides = {};
		var attrPicks = ['_has-parents', '_has-spouse'];
		
		jsPlumb.detachEveryConnection();
		jsPlumb.deleteEveryEndpoint();
		
		jsPlumb.batch(function() {
			
			$.each(attrPicks, function(index1, value1) {
				
				$('[' + value1 + ']').each(function(index2, value2) {
					
					var $this = $(this);
					var source = $this.attr('id');
					var targets = $this.attr(value1).split(',');
					
					$.each(targets, function(index3, value3) {
						
						jsPlumb.connect({
							source: source,
							target: value3,
							isSource: true, // ?
							isTarget: true, // ?
							//maxConnections: (parent ? -1 : 1),
							maxConnections: -1
						}, ((value1.indexOf('spouse') !== -1) ? parentOverrides : childrenOverrides));
						
					});
					
				});
				
			});
			
		});
		
	};
	
	ns.plumb._private.plumb = function() {
		
		var $self = this;
		
		// https://jsplumbtoolkit.com/community/doc/connect-examples.html
		jsPlumb.ready(function() {
			
			jsPlumb.importDefaults({
				ConnectionsDetachable: false,
				Connector: ['Flowchart', {
					// stub: [
					// 	50,
					// 	50
					// ],
					gap: 0,
					cornerRadius: 0,
					alwaysRespectStubs: true
				}],
				Anchors:[
					'Top',
					'Bottom'
				],
				// Endpoint: ['Dot', {
				// 	radius: 5
				// }],
				Endpoint: 'Blank',
				// EndpointStyles: [{
				// 	fillStyle: 'gray'
				// }, {
				// 	fillStyle: 'gray'
				// }],
				PaintStyle: {
					strokeStyle: 'black',
					fillStyle: 'black',
					radius: 0,
					lineWidth: 4
				},
			});
			
			jsPlumb.setContainer($('#group'));
			
			$self.draw();
			
		});
		
	};
	
	ns.plumb._private.getMidPoint = function($el1, $el2) {
		
		var meta = function($obj) {
			return {
				position: $obj.position(),
				width: $obj.width(),
				height: $obj.height()
			};
		};
		var meta1 = meta($el1);
		var meta2 = ($el2 && $el2.length) ? meta($el2) : meta1;
		
		return {
			top: (
				(
					(meta1.position.top + (meta1.height / 2))
					+
					(meta2.position.top + (meta2.height / 2))
				) / 2
			),
			left: (
				(
					(meta1.position.left + (meta1.width / 2))
					+
					(meta2.position.left + (meta2.width / 2))
				) / 2
			)
		};
		
	};
	
	ns.plumb._private.proxii = function() {
		
		var $self = this;
		var $group = $('#group');
		var proxy = function(id) {
			var $result = $('<div />', {
				'class': ('proxy' + (ns.debug ? ' proxy-debug' : ''))
			});
			if (id) {
				$result.attr('id', id);
			}
			return $result;
		};
		var found = [];
		
		$('[person]').each(function(key, value) {
			
			var $this = $(this);
			var position = $self.getMidPoint($this);
			var parent = (($this.attr('has-mother') || '') + ($this.attr('has-father') || ''));
			var proxyId = ('_' + $this.attr('id'));
			var $proxy = proxy(proxyId);
			
			$this.attr('_proxy', proxyId);
			
			$proxy.css({
				'top': position.top,
				'left': position.left
			});
			
			if (parent) {
				
				$proxy.attr('_has-parents', (parent ? ('_' + parent) : ''));
				
			}
			
			$group.append($proxy);
			
		});
		
		// Must have a non-empty mother and father attributes:
		$('[person][has-mother]:not([has-mother=""])[has-father]:not([has-father=""])').each(function(key, value) {
			
			var $this = $(this);
			var mother = $this.attr('has-mother');
			var $mother = $('#' + mother);
			var father = $this.attr('has-father');
			var $father = $('#' + father);
			var id = (mother + father);
			var proxyId = ('_' + id);
			var $proxy;
			var position;
			
			if ($.inArray(id, found) == -1) {
				
				$proxy = proxy(proxyId);
				
				position = $self.getMidPoint($mother, $father);
				
				$proxy.css({
					'top': position.top,
					'left': position.left
				});
				
				$proxy.attr('_has-spouse', ($mother.attr('_proxy') + ',' + $father.attr('_proxy')));
				
				$group.append($proxy);
				
			}
			
			found.push(id);
			
		});
		
	};
	
}(
	window.FT = (window.FT || {}),
	document
));
