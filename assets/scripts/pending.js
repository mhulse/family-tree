/* jshint esversion:6, unused:false, laxbreak:true */
/* global $, jsPlumb */
$(function() {
	
	'use strict';
	
	function draw() {
		
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
		
	}
	
	function init() {
		
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
					strokeStyle: 'gray',
					fillStyle: 'gray',
					radius: 0,
					lineWidth: 4
				},
			});
			
			jsPlumb.setContainer($('#canvas'));
			
			draw();
			
		});
		
	}
	
	function getMidPoint($el1, $el2) {
		
		var meta = function($obj) {
			return {
				offset: $obj.offset(),
				width: $obj.width(),
				height: $obj.height()
			};
		};
		var meta1 = meta($el1);
		var meta2 = ($el2 && $el2.length) ? meta($el2) : meta1;
		
		return {
			top: (
				(
					(meta1.offset.top + (meta1.height / 2))
					+
					(meta2.offset.top + (meta2.height / 2))
				) / 2
			),
			left: (
				(
					(meta1.offset.left + (meta1.width / 2))
					+
					(meta2.offset.left + (meta2.width / 2))
				) / 2
			)
		};
		
	}
	
	function proxii() {
		
		var $canvas = $('#canvas');
		var proxy = function(id) {
			var $result = $('<div />', {
				'class': 'proxy'
			});
			if (id) {
				$result.attr('id', id);
			}
			return $result;
		};
		var found = [];
		
		$('.person').each(function(key, value) {
			
			var $this = $(this);
			var position = getMidPoint($this);
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
			
			$canvas.append($proxy);
			
		});
		
		$('.person[has-mother][has-father]').each(function(key, value) {
			
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
				
				position = getMidPoint($mother, $father);
				
				$proxy.css({
					'top': position.top,
					'left': position.left
				});
				
				$proxy.attr('_has-spouse', ($mother.attr('_proxy') + ',' + $father.attr('_proxy')));
				
				$canvas.append($proxy);
				
			}
			
			found.push(id);
			
		});
		
	}
	
	proxii();
	
	init();
	
});
