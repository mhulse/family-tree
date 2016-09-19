(function(ns, $, undefined) {
	
	'use strict';
	
	function Panel(options) {
		this._init();
	}
	
	Panel.prototype._init = function() {
		this.panel = $('#panel');
		//this.panel.addClass('is-closed');
		this.button = $('#toggle');
		this._initEvents();
	};
	
	Panel.prototype._initEvents = function() {
		this.button.on('click', function(event) {
			event.preventDefault();
			this.toggle();
		}.bind(this));
	};
	
	Panel.prototype.toggle = function() {
		if (this.panel.hasClass('is-open')) {
			this.close();
		} else {
			this.open();
		}
	};
	
	Panel.prototype.open = function() {
		this.panel.removeClass('is-closed').addClass('is-open');
		this.button.children('span').text('close');
	};
	
	Panel.prototype.close = function() {
		this.panel.removeClass('is-open').addClass('is-closed');
		this.button.children('span').text('open');
	};
	
	ns.Panel = Panel;
	
}(
	window.FT = (window.FT || {}),
	jQuery
));
