(function(ns, $, undefined) {
	
	'use strict';
	
	ns.panel = {};
	
	function Create(options) {
		this._init();
	}
	
	Create.prototype._init = function() {
		this.panel = $('#panel');
		//this.panel.addClass('is-closed');
		this.button = $('#toggle');
		this._initEvents();
	};
	
	Create.prototype._initEvents = function() {
		this.button.on('click', function(event) {
			event.preventDefault();
			this.toggle();
		}.bind(this));
	};
	
	Create.prototype.toggle = function() {
		if (this.panel.hasClass('is-open')) {
			this.close();
		} else {
			this.open();
		}
	};
	
	Create.prototype.open = function() {
		this.panel.removeClass('is-closed').addClass('is-open');
		this.button.children('span').text('close');
	};
	
	Create.prototype.close = function() {
		this.panel.removeClass('is-open').addClass('is-closed');
		this.button.children('span').text('open');
	};
	
	ns.panel.create = Create;
	
}(
	window.FT = (window.FT || {}),
	jQuery
));
