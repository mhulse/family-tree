(function(ns, document, undefined) {
	
	'use strict';
	
	var FamilyTree = function() {
		return (window.FamilyTreeJS.FamilyTree() || new FamilyTreeJS.FamilyTree()); // The tree object.
	};
	var all_people = []; // Store all people in this array.
	var tree_people = []; // The people in the FamilyTree.
	
	// Store all of the people in the tree in this array (for use when re-rendering the tree):
	var Details = function(props) {
		
		// props {
		// person_name
		// person_relationship
		// person_gender
		// person_birth_year
		// person_status
		// crc_diagnosis
		// crc_discussed
		// study_participant
		// health_informant
		// }
		
		this.person_name = (props.person_name || '');
		this.person_relationship = (props.person_relationship || '');
		this.person_gender = (props.person_gender || '');
		this.person_birth_year = (props.person_birth_year || '');
		this.person_status = (props.person_status || '');
		this.crc_diagnosis = (props.crc_diagnosis || '');
		this.crc_discussed = (props.crc_discussed || '');
		this.study_participant = (props.study_participant || false);
		this.health_informant = (props.health_informant || false);
		
	};
	
	var Person = function(props) {
		
		// props {
		// uid,
		// details,
		// parents,
		// children
		// }
		
		this.uid = (props.uid || null);
		this.details = (props.details || null);
		this.parents = (props.parents || []);
		this.children = (props.children || []);
		this.spouse = null;
		
	};
	
	ns.wrapper = {};
	
	ns.wrapper.addPerson = function(props){
		
		// props {
		// add_person_to_uid
		// person_name
		// person_relationship
		// person_gender
		// person_birth_year
		// person_status
		// crc_diagnosis
		// crc_discussed
		// study_participant
		// health_informant
		// }
		
		// Create a new uid for this person:
		var uid = _.uniqueId('uid');
		var details = new Details({
			person_name: props.person_name,
			person_relationship: props.person_relationship,
			person_gender: props.person_gender,
			person_birth_year: props.person_birth_year,
			person_status: props.person_status,
			crc_diagnosis: props.crc_diagnosis,
			crc_discussed: props.crc_discussed,
			study_participant: props.study_participant,
			health_informant: props.health_informant
		}); 
		var tmp_person = new Person({
			uid: uid,
			details: details
		});
		var add_person_to_uid = getPerson(props.add_person_to_uid);
		var tmp_spouse;
		var child;
		var kid;
		var parent;
		var tree = FamilyTree();
		
		if ( ! props.person_relationship) {
			
			all_people[tmp_person.uid] = tmp_person;
			
		} else if (props.person_relationship == 'parent') {
			
			if (add_person_to_uid.parents.length > 0) {
				
				tmp_spouse = getPerson(add_person_to_uid.parents[0]);
				
				tmp_spouse.spouse = tmp_person.uid;
				tmp_person.spouse = tmp_spouse.uid;
				
				for (child in tmp_spouse.children) {
					
					getPerson(tmp_spouse.children[child]).parents.push(tmp_person.uid);
					
				}
				
			}
			
			add_person_to_uid.parents.push(tmp_person.uid);
			tmp_person.children.push(add_person_to_uid.uid);
			
			all_people[tmp_person.uid] = tmp_person;
			
		} else if (props.person_relationship == 'child') {
			
			if (add_person_to_uid.spouse !== null) {
				
				tmp_person.parents.push(add_person_to_uid.spouse);
				
				getPerson(add_person_to_uid.spouse).children.push(tmp_person.uid);
				
			}
			
			tmp_person.parents.push(add_person_to_uid.uid);
			add_person_to_uid.children.push(tmp_person.uid);
			
			// Add the 'add to' parent to the childs parent array:
			all_people[tmp_person.uid] = tmp_person;
			
			// Check to see if the exisitng parent has any other children and if they do, is there another parent in the parent array?
			
		} else if (props.person_relationship == 'sibling') {
			
			add_person_to_uid = getPerson(add_person_to_uid.parents[0]);
			
			// Add the 'add to' parent to the childs parent array:
			add_person_to_uid.children.push(tmp_person.uid);
			
			if (add_person_to_uid.spouse !== null) {
				
				tmp_person.parents.push(add_person_to_uid.spouse);
				
				getPerson(add_person_to_uid.spouse).children.push(tmp_person.uid);
				
			}
			
			all_people[tmp_person.uid] = tmp_person;
			
			// Check to see if the exisitng parent has any other children and if they do, is there another parent in the parent array?
			for (kid in add_person_to_uid.children) {
				
				if (add_person_to_uid.children[kid] != uid) {
					
					for (parent in add_person_to_uid.children[kid].parents) {
						
						if (add_person_to_uid.children[kid].parents[parent] != add_person_to_uid.uid){
							
							tmp_person.parents.push(add_person_to_uid.children[kid].parents[parent]);
							
						}
						
					}
					
				}
				
			}
			
		}
		
		renderTree();
		
		return $(uid);
		
	};
	
	ns.wrapper.removePerson = function(uid) {
		
		removePerson(all_people[uid]); // Use getPerson() here (and elsewhere)?
		
		renderTree();
		
	};
	
	// Outside access:
	ns.wrapper.getPerson = function(uid) {
		
		return getPerson(uid);
		
	};
	
	function getPerson(uid) {
		
		return all_people[uid];
		
	}
	
	function insertPerson(person){
		
		all_people[person.uid] = person;
		
	}
	
	function removePerson(person){
		
		var parent;
		var tmp;
		var index;
		var child;
		
		// Remove this person from it's parents tree:
		delete all_people[person.uid];
		
		for (parent in person.parents) {
			
			//console.log(person);
			
			tmp = all_people[parent];
			
			index = tmp.children.indexOf(person.uid);
			
			if ((index > -1) && (tmp !== null)) {
				
				tmp.children.splice(index,1);
				
			}
			
		}
		
		if (person.spouse !== null) {
			
			all_people[person.spouse].spouse = null;
			
		} else {
			
			for (child in person.children) {
				
				removePerson(all_people[child]);
				
			}
			
		}
		
	}
	
	function renderTree(){
		
		var tree_people = [];
		var person;
		var tmp;
		var tmp_spouse;
		var kid;
		var tree = FamilyTree();
		
		for (person in all_people) {
			
			tmp = all_people[person];
			tmp_spouse = getPerson(tmp.spouse);
			
			if (tree_people[tmp.uid] === undefined) {
				
				tree_people[tmp.uid] = tree.AddPerson(
					tmp.details.person_name,
					tmp.details,
					tmp.uid,
					tmp.spouse
				);
				
				if ((tmp.spouse !== null) && (tree_people[tmp.spouse] === undefined)) {
					
					tree_people[tmp_spouse.uid] = tree.AddPerson(
						tmp_spouse.details.person_name,
						tmp_spouse.details,
						tmp_spouse.uid,
						tmp_spouse.spouse
					);
					
				}
				
			}
			
		}
		
		// Now that all of the people have been added then we associate them with their children:
		for (person in all_people) {
			
			tmp = all_people[person];
			
			for (kid in tmp.children) {
				
				tree_people[tmp.children[kid]].addParent(tree_people[tmp.uid]);
				
			}
		}
		
		tree.Render(document.getElementById('group')); // Make jQ?
		
	}
	
}(
	window.FT = (window.FT || {}),
	document
));
