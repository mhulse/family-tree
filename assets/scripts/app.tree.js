(function(ns, document, undefined) {
	
	'use strict';
	
	var $group = $('#group');
	
	ns.tree = {};
	
	ns.tree.init = function() {
		
		// Add the first person to the tree:
		addPerson({
			person_name: 'Tim Woolley',
			person_birth_year: '1968',
			person_status: 'living',
			person_gender: 'Male',
			crc_diagnosis: 'positive',
			study_participant: true
		}, 'you');
		
		// Custom event triggerd via `app.modal.js`:
		$group.on('trigger.submit', function(event, id) {
			
			switch (id) {
				
				case 'person-add':
					
					if ($('#person-relationship').val() == 'parents') {
						addParents();
					} else {
						addPerson();
					}
					
					break;
				
				case 'person-remove':
					
					ns.root.wrapper.removePerson($('#add-person-to-uid').val());
					
					break;
				
				default:
					
					// What to log and where?
				
			}
			
		});
		
		function addPerson(settings, klass) {
			
			var person;
			
			function getGender(relationship) {
				return (_([
					'father',
					'son',
					'brother'
				]).contains(relationship.toLowerCase()) ? 'male' : 'female');
			}
			
			// Add person manually:
			if (_(settings).size()) {
				
				person = ns.root.wrapper.addPerson(settings);
				
				if (klass && klass.length) {
					
					$('#' + person.uid).addClass(klass);
					
				}
				
			} else { // … or dynamically via form:
				
				settings = {
					add_person_to_uid: $('#add-person-to-uid').val(),
					person_name: $('#person-name').val(),
					person_relationship: $('#person-relationship').val(),
					person_gender: getGender($('#person-relationship option:selected').text()),
					person_birth_year: $('#person-birth-year').val(),
					person_status: $('#person-status').val(),
					crc_diagnosis: $('#crc-diagnosis').val(),
					crc_discussed: $('#crc-discussed').val(),
					health_informant: false // Need to figure out how to handle this.
				};
				
				// Add a new person:
				ns.root.wrapper.addPerson(settings);
				
				// Broadcast custom event for use in other scripts:
				$group.trigger('trigger.tree'); // There is no endpoint for this demo.
				
			}
			
		}
		
		// Note: This functionality is currently not used.
		// We’ll need to update the below vars if re-enabling this code.
		/*
		function addParents() {
			
			var add_person_to_uid = $('#add-person-to-uid').val();
			var person_type = 'parent';
			var person_name = ($('#person-name').val());
			var person_2_name = ($('#person-2-name').val());
			
			ns.root.wrapper.addPerson({
				person_type: person_type,
				adding_to: add_person_to_uid,
				name: person_name
			});
			
			ns.root.wrapper.addPerson({
				person_type: person_type,
				adding_to: add_person_to_uid,
				name: person_2_name
			});
			
		}
		*/
		
	};
	
}(
	window.FT = (window.FT || {}),
	document
));
