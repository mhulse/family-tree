/* jshint laxbreak:true */
(function() {
	
	var merge = function() {
		
		var merged = {};
		var i;
		var l;
		var source;
		var key;
		var value;
		
		for (i = 0, l = arguments.length; i < l; i++) {
			
			source = arguments[i];
			
			if (typeof source !== 'object') { continue; } // Each argument must be an object.
			
			for (key in source) {
				
				value = source[key];
				
				if (typeof value !== 'object') {
					
					// Simple value:
					merged[key] = value;
					
				} else {
					
					// Value is an object:
					if (typeof merged[key] === 'undefined') {
						
						merged[key] = deep_copy(value);
						
					} else {
						
						merged[key] = merge(merged[key], value);
						
					}
					
				}
				
			}
			
		}
		
		return merged;
		
	};
	
	window.merge = merge; // Why attach to `Window`?
	
	var deep_copy = function(source) {
		
		var copied = {};
		var key;
		var value;
		
		if (typeof source !== 'object') {
			
			return copied;
			
		}
		
		for (key in source) {
			
			value = source[key];
			
			if (typeof value === 'object') {
				
				value = deep_copy(value);
				
			}
			
			copied[key] = value;
			
		}
		
		return copied;
		
	};
	
	var nextNodeID = (function() {
		
		var nodes = 0;
		
		return function() {
			
			return ('uid' + nodes++);
			
		};
		
	})();
	
	window.FamilyTreeJS = {
		
		FamilyTree: function() {
			
			var tree_element = null;
			var people = []; // Holds all people in the family tree.
			
			this.config = {
				compressable: true,
				node: {
					height: 160, // Approximate.
					width: 100,
					spacingVertical: 100,
					spacingHorizontal: 100
				}
			};
			
			var Person = function(identity, config, details, node_id, spouse) { // Warning: `identity` (ab)used in child scopes.
				
				this.node_id = (node_id || nextNodeID());
				
				this.identity = identity; // See this …
				
				this.details = ((typeof details !== 'undefined') ? details : {});
				
				this.parents = [];
				
				this.children = [];
				
				this.spouse = (spouse || null);
				
				this.leveled = false;
				
				this.level = null;
				
				//this.rendered = false;
				
				this.on_grid = false;
				
				this.starting_pos = null;
				
				//this.connected = false;
				
				this.node = null;
				
				this.config = config;
				
				/*
				this.birth = function(identity, details, node_id) { // Passed in here too!
					
					var config = deep_copy(this.config);
					
					if ((typeof details !== 'undefined') && (typeof details.config !== 'undefined')) {
						
						config = merge(config, details.config);
						
					}
					
					// Create new person:
					var person = new Person(
						identity, // … look, it’s here as well!
						deep_copy(config),
						details,
						node_id
					);
					
					// Add parent/child relatonship:
					person.parents.push(this);
					this.children.push(person);
					
					if ((typeof details !== 'undefined') && (typeof details.partner !== 'undefined')) {
						
						person.parents.push(details.partner);
						
						details.partner.children.push(person);
						
					}
					
					people.push(person);
					
					return person;
					
				};*/
				
				this.addParent = function(parent, details) {
					
					this.parents.push(parent);
					
					parent.children.push(this);
					
				};
				
				this.Level = function(level) {
					
					var i;
					var l;
					
					this.level = level;
					this.leveled = true;
					
					for (i = 0, l = this.parents.length; i < l; i++) {
						
						if ( ! this.parents[i].leveled) {
							
							this.parents[i].Level(level - 1);
							
						}
						
					}
					
					for (i = 0, l = this.children.length; i < l; i++) {
						
						if ( ! this.children[i].leveled) {
							
							this.children[i].Level(level + 1);
							
						}
						
					}
					
				};
				
				this.GetMaxNodeWidth = function() {
					
					var width = 0;
					var has_children = false;
					var i;
					var l;
					
					for (i = 0, l = this.children.length; i < l; i++) {
						
						if (this.children[i].parents[0] === this) {
							
							has_children = true;
							
							width += this.children[i].GetMaxNodeWidth();
							
						}
						
					}
					
					return (width + ((has_children) ? 0 : 1));
					
				};
				
				this.FillGrid = function(grid, starting_pos) {
					
					var i;
					var l;
					var j;
					var jl;
					var partners = [];
					var children = [];
					var found;
					var k;
					var kl;
					var children_aggregate_size = 0;
					
					if (this.on_grid) {
						
						return grid;
						
					}
					
					if (typeof grid[this.level] === 'undefined') {
						
						grid[this.level] = [];
						
					}
					
					this.on_grid = true;
					
					// Make sure our main parent is on the grid:
					if (this.parents.length > 0) {
						
						if (typeof grid[this.level-1] === 'undefined') {
							
							grid[this.level-1] = [];
							
						}
						
						grid = this.parents[0].FillGrid(grid, grid[this.level-1].length);
						
						if (this.parents[0].starting_pos > starting_pos) {
							
							starting_pos = this.parents[0].starting_pos;
							
						}
						
					}
					
					while ((typeof grid[this.level][starting_pos] !== 'undefined') && (grid[this.level][starting_pos] !== null)) {
						
						starting_pos++;
						
					}
					
					this.starting_pos = starting_pos;
					
					while (starting_pos > grid[this.level].length) {
						
						grid[this.level].push(null);
						
					}
					
					grid[this.level][starting_pos] = this;
					
					for (i = 0, l = this.GetMaxNodeWidth(); i < (l - 1); i++) {
						
						grid[this.level].push(null);
						
					}
					
					// Lists of partners & children:
					for (i = 0, l = this.children.length; i < l; i++) {
						
						if (this === this.children[i].parents[0]) {
							
							children.push(this.children[i]);
							
						}
						
						for (j = 0, jl = this.children[i].parents.length; j < jl; j++) {
							
							if (this !== this.children[i].parents[j]) {
								
								found = false;
								
								for (k = 0, kl = partners.length; k < kl; k++) {
									
									if (partners[k] === this.children[i].parents[j]) {
										
										found = true;
										
									}
									
								}
								
								if ( ! found) {
									
									partners.push(this.children[i].parents[j]);
									
								}
								
							}
							
						}
						
					}
					
					// Put the partners on our grid:
					for (i = 0, l = partners.length; i < l; i++) {
						
						grid = partners[i].FillGrid(grid, (starting_pos + this.GetMaxNodeWidth()));
						
					}
					
					// Add our children:
					for (i = 0, l = children.length; i < l; i++) {
						
						grid = children[i].FillGrid(grid, starting_pos + children_aggregate_size);
						
						children_aggregate_size += children[i].GetMaxNodeWidth();
						
					}
					
					return grid;
					
				};
				
				/*
				this.IsChildNo = function() {
					
					var i;
					var l;
					
					if (this.parents.length === 0) {
						
						return 0;
						
					}
					
					parent = this.parents[0];
					
					for (i = 0, l = parent.children.length; i < l; i++) {
						
						if (parent.children[i].node_id === this.node_id) {
							
							return i;
							
						}
						
					}
					
				};
				*/
				
				return this;
				
			};
			
			// Used to add a 'parentless' person to the family tree (no higher-level nodes):
			this.AddPerson = function(identity, details, node_id, spouse) {
				
				var config = deep_copy(this.config);
				var person;
				
				if ((typeof details !== 'undefined') && (typeof details.config !== 'undefined')) {
					
					config = merge(config, details.config);
					
				}
				
				person = new Person(
					identity,
					config,
					details,
					node_id,
					spouse
				);
				
				people.push(person);
				
				return person;
				
			};
			
			// Renders the family tree:
			this.Render = function(element) {
				
				var i;
				var l;
				var grid = {};
				var level_increase;
				var g;
				var j;
				var clear_above;
				var clear_below;
				var k;
				var kl;
				var all_nodes = [];
				var level;
				var nodes;
				var node1;
				var node2;
				
				tree_element = element;
				//tree_element.style.position = 'relative';
				tree_element.innerHTML = '';
				
				// Generate all the people's levels so we know where they are at:
				people[0].Level(0);
				
				min_level = 0;
				
				for (i = 0, l = people.length; i < l; i++) {
					
					if (people[i].level < min_level) {
						
						min_level = people[i].level;
						
					}
					
				}
				
				if (min_level < 0) {
					
					level_increase = (min_level * -1);
					
					for (i = 0, l = people.length; i < l; i++) {
						
						people[i].level += level_increase;
						
					}
					
				}
				
				grid = people[0].FillGrid(grid, 0);
				
				// Compress the grid:
				while_loop: while (true) {
					
					for (g in grid) {
						
						level = grid[g];
						
						for (j = 1; j < level.length; j++) {
							
							node = level[j];
							
							if ((node !== null) && (level[j - 1] === null) && (node.config.compressable === true)) {
								
								// It's a candidate to move, nothing to it's left.
								// Is anything around it may conflict with?
								
								// Are we already above our first parent? If so we shouldn't wander away:
								if (node.parents.length) {
									
									if ((grid[node.level - 1] === null) || (typeof grid[node.level - 1] !== 'undefined')) {
										
										if ((grid[node.level - 1][j] !== null) && (grid[node.level - 1][j] === node.parents[0])) {
											
											continue;
											
										}
										
									}
									
								}
								
								clear_above = true;
								clear_below = true;
								
								if (typeof grid[node.level + 1] !== 'undefined') {
									
									if ((grid[node.level + 1][j - 1] !== null) && (typeof grid[node.level + 1][j - 1] !== 'undefined') && (grid[node.level + 1][j - 1].parents.length > 0)) {
										
										// We're blocked if the thing below isn't our child
										
										clear_below = false;
										
										for (k = 0, kl = node.children.length; k < kl; k++) {
											
											if (grid[node.level + 1][j -  1] === node.children[k]) {
												
												clear_below = true;
												
											}
											
										}
										
									}
									
								}
								
								if (clear_above && clear_below) {
									
									grid[g][j - 1] = node;
									
									grid[g][j] = null;
									
									continue while_loop;
									
								}
								
							}
							
						}
						
					}
					
					break;
					
				}
				
				for (level in grid) {
					
					nodes = grid[level];
					
					for (i = 0, l = nodes.length; i < l; i++) {
						
						node1 = nodes[i];
						
						if (node1 !== null) {
							
							this.RenderNode(node1, tree_element, level, i);
							
							all_nodes.push(node1);
							
						}
						
					}
					
				}
				
				for (node2 in all_nodes) {
					
					node2 = all_nodes[node2];
					
				}
				
			};
			
			this.RenderNode = function(person, parent, level, position) {
				
				var template;
				var $node;
				
				function hasParentType(which, parents) {
					var obj;
					var result = [];
					for (obj in parents) {
						if (parents[obj].details.person_gender.toLowerCase() == which) {
							result.push(parents[obj].node_id);
						}
					}
					return result.join(',');
				}
				
				function hasMothers(parents) {
					return hasParentType('female', parents);
				}
				
				function hasFathers(parents) {
					return hasParentType('male', parents);
				}
				
				template = [
					'<div>',
						'<span ft-controls>',
							'<span class="add-relative" ft-controls="add"><span>Add Relative</span></span>',
							'<span class="view-relative" ft-controls="view"><span>View Details</span></span>',
						'</span>',
						((person.details.study_participant) ? '<span ft-icon="user" ft-cardinal="se"></span>' : ''),
						((person.details.health_informant) ? '<span ft-icon="book" ft-cardinal="se"></span>' : ''),
						((person.details.crc_diagnosis == 'positive') ? '<span ft-icon ft-cardinal="nw"></span>' : ''),
						((person.details.crc_discussed == 'yes') ? '<span ft-icon="commenting" ft-cardinal="ne"></span>' : ''),
					'</div>',
					'<div>',
						'<span meta="name" ft-ellipsis>',
							person.details.person_name,
						'</span>',
						'<span meta="lifespan">',
							((person.details.person_birth_year) ? person.details.person_birth_year : ''),
							((person.details.person_death_year) ? ('–' + person.details.person_death_year) : ''),
						'</span>',
					'</div>'
				].join('\n');
				
				$node = $('<div />', {
					id: person.node_id
				})
					.addClass([
						person.details.person_gender.toLowerCase(),
						person.details.person_status.toLowerCase(),
						(person.details.study_participant ? 'you' : '')
					].join(' '))
					.attr({
						'person': '',
						'has-mother': hasMothers(person.parents),
						'has-father': hasFathers(person.parents),
						'has-spouse': ((person.spouse === null) ? '' : person.spouse)
					})
					.css({
						left: ((position * (this.config.node.width + this.config.node.spacingHorizontal)) + 'px'),
						top: ((level * (this.config.node.height + this.config.node.spacingVertical)) + 'px'),
						width: (this.config.node.width + 'px')
						//height: (this.config.node.height + 'px')
					})
					.html(template);
				
				$(parent).append($node);
				
				person.node = $node[0]; // Need to pass the jQuery object instead.
				
			};
		
		}
		
	};
	
})();
