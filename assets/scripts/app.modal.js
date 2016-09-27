// @TODO: Optimize code; improve usage of cached jQuery objects.
(function(ns, undefined) {
	
	'use strict';
	
	var $parent = $('#group');
	var $modal = $('#modal');
	var id;
	var years;
	var titles = {
		add: 'Add relative',
		view: 'View relative',
		remove: 'Remove relationship'
	};
	
	ns.modal = {};
	
	ns.modal.init = function() {
		
		var self = this;
		
		$('#modal-form-header-title').text(titles.add);
		
		$parent.on('click', '.add-relative, .view-relative', function(event) {
			
			var $target = $(event.target);
			
			id = $target.closest('[person]').attr('id');
			
			// Required!
			$('#add-person-to-uid').val(id);
			
			self.open($target.attr('class'));
			
		});
		
		// Handle keyboard access to the modal window’s form:
		$(window).keydown(function(event) {
			
			if ((event.keyCode === 13) || (event.keyCode === 27)) {
				
				event.preventDefault();
				
				if (event.keyCode === 13) { // Enter key.
					$('#person-add').click(); // Validate.
				}
				
				if (event.keyCode === 27) { // Escape key
					$('#person-cancel').click(); // Close.
				}
				
			}
			
		});
		
		// Make sure the form DOES NOT submit itself:
		$('#modal-form').submit(function(event) {
			event.preventDefault();
			return false;
		});
		
		years = birthYears();
		
		$('.years').append(years);
		
		deathYearSetup();
		
	};
	
	ns.modal.open = function(klass) {
		
		var self = this;
		var gc = function() {
			
			// Reset title:
			$('#modal-form-header-title').text(titles.add);
			
			// Make sure the add button is visible by default (hidden when viewing user details):
			$('#person-add').removeClass('hide');
			
			// Make sure the relationship box is shown the next time the modal opens:
			$('#modal-form-person-relationship').removeClass('hide');
			
			// Hide death box for the next modal window opening:
			$('#modal-form-person-death-year').addClass('hide');
			
			// Various other cleansing/resetting of modal:
			$(this)
				.off('click.modal')
				.removeClass('modal-open')
				.find('form')
				.trigger('reset')
				.find('.missing')
				.removeClass('missing');
			
		};
		
		// Do we want to load the clicked user’s details?
		if (klass.indexOf('view') != -1) {
			
			this.populate();
			
		}
		
		$modal.addClass('modal-open');
		
		$modal.on('click.modal', function(event) {
			
			if ($(event.target).hasClass('modal-open')) {
				
				gc.call($modal);
				
			}
			
		});
		
		$modal.on('click.modal', '.modal-close', function(event) {
			
			event.preventDefault();
			
			gc.call($modal);
			
		});
		
		$modal.on('click.modal', '.modal-action', function(event) {
			
			event.preventDefault();
			
			if (self.validate($modal.children('form'))) {
				
				$modal.trigger('trigger.modal', [
					event.target.id
				]);
				
				gc.call($modal);
				
			} else {
				
				console.log('Form fields are not valid.');
				
			}
			
		});
		
		console.log('Opening modal window …');
		
	};
	
	// Replace with more robust validation code:
	ns.modal.validate = function(form) {
		
		var valid = true;
		var $form = ns.util.cache(form);
		var missing = function(action) {
			$(this).closest('label')[action + 'Class']('missing');
		};
		
		$form.find('.validate').each(function() {
			
			var $this = $(this);
			
			if ($this.is(':visible')) {
				
				if ($this.val() === '') {
					
					missing.call(this, 'add');
					
					valid = false;
					
				} else {
					
					missing.call(this, 'remove');
					
				}
				
			}
			
		});
		
		return valid;
		
	};
	
	ns.modal.populate = function() {
		
		$('#person-add').addClass('hide');
		
		$('#modal-form-header-title').text(titles.view);
		
		var user = ns.root.wrapper.getPerson(id);
		
		$('#person-name').val(user.details.person_name);
		$('#modal-form-person-relationship').addClass('hide'); // If just viewing, don’t show this.
		$('#person-birth-year').val(user.details.person_birth_year);
		$('#person-status').val(user.details.person_status);
		$('#crc-diagnosis').val(user.details.crc_diagnosis);
		$('#crc-discussed').val(user.details.crc_discussed);
		
	};
	
	function deathYearSetup() {
		
		var $modal_form_person_death_year = $('#modal-form-person-death-year');
		
		$modal_form_person_death_year.addClass('hide');
		
		$('#person-status').on('change', function(event) {
			
			if ($(this).val() == 'deceased') {
				$modal_form_person_death_year.removeClass('hide');
			} else {
				$modal_form_person_death_year.addClass('hide');
			}
			
		});
		
	}
	
	function birthYears() {
		
		var date = new Date();
		var year = date.getFullYear();
		var i;
		var html = '';
		
		for (i = year; i >= 1900; i--) {
			
			html += ('<option value="' + i + '">' + i + '</option>');
			
		}
		
		return html;
		
	}
	
}(
	window.FT = (window.FT || {}),
	document
));

window.FT.modal.init();
