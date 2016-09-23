(function(ns, $, undefined) {
	
	'use strict';
	
	ns.panel = {};
	
	function Create(options) {
		this._init();
	}
	
	Create.prototype._init = function() {
		this.panel = $('#panel'); // The `.prototype`’s panel.
		this.button = $('#toggle');
		this._initCookie();
		this._initEvents();
	};
	
	Create.prototype._initCookie = function() {
		var value = Cookies.get('ft-panel');
		if ( ! value) {
			this.close();
		} else {
			this[value]();
		}
	};
	
	Create.prototype._manageCookie = function(value) {
		Cookies.set('ft-panel', value, {
			path: ''
		});
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
		this._manageCookie('open');
		this.panel.removeClass('is-closed').addClass('is-open');
		this.button.children('span').text('close');
	};
	
	Create.prototype.close = function() {
		this._manageCookie('close');
		this.panel.removeClass('is-open').addClass('is-closed');
		this.button.children('span').text('open');
	};
	
	ns.panel.create = Create;
	
}(
	window.FT = (window.FT || {}),
	jQuery
));
