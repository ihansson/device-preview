let nodes = [],
	opts = {},
	events = {},
	presets = {};

// Custom events

const event_names = ['device/load', 'device/remove', 'device/update'];
for(ev in event_names){
	let event = document.createEvent('Event');
	event.initEvent(event_names[ev], true, true);
	events[event_names[ev]] = event;
}

// Update options
function configure(_opts){
	for(opt in _opts){
		opts[opt] = _opts[opt]
	}
}

// Setup before first update
function add(selector, options){
	let _nodes = document.querySelectorAll(selector);
	_nodes = Array.prototype.slice.call(_nodes)
	for(i in _nodes) load(_nodes[i], options)
	nodes = nodes.concat(_nodes)
}

// Remove node from list to update
function remove(node){
	node.dispatchEvent(events['device/remove'])
	if(node.device.timeout) window.clearTimeout(node.device.timeout)
	nodes = nodes.filter(function(_node){ return _node !== node})
}

// Sets up initial classes on nodes
function load(node){

	node.device = {
		screenshot: 'placeholder.png',
	}

	if(node.attributes.device){
		let settings = node.attributes.device ? extract_settings(node.attributes.device.nodeValue) : {};
		for(setting in settings){
			node.device[setting] = settings[setting]
		}
	}

	let preset = presets[node.device.preset]
	if(!preset.gizmos) preset.gizmos = {}

	let resolution_values = preset.resolution.split(':')
	let resolution = resolution_values[1] / resolution_values[0]

	node.style.paddingBottom = (resolution * 100)+'%';
	node.style['--color-a'] = 'green';

	let style_string = 'padding-bottom:'+(resolution * 100)+'%;';
	if(preset.styles) Object.keys(preset.styles).forEach(function(key){
		style_string += '--'+key+': '+preset.styles[key]+';';
	})
	node.setAttribute("style", style_string);

	let wrapper = document.createElement("div")
	wrapper.className = "device-wrapper";

	['back',,'left','right','top','bottom','corners','front'].forEach(piece => {

		const el = document.createElement("div")
		el.className = "device-"+piece;

		if(preset.gizmos[piece]){
			preset.gizmos[piece].forEach(function(gizmo) {
				let gizmo_el = document.createElement("div")
				gizmo_el.className = "device-gizmo device-gizmo-"+gizmo.position+" device-"+gizmo.type;
				if(gizmo.type == 'speaker'){
					while(gizmo.dots){
						gizmo.dots--;
						let dot = document.createElement("div")
						dot.className = "device-speaker-dot";
						gizmo_el.appendChild(dot)
					}
				}
				if(gizmo.type == 'html'){
					gizmo_el.innerHTML = gizmo.content
				}
				el.appendChild(gizmo_el)
			})
		}

		if(piece == 'corners'){
			['bottom-left','bottom-right','top-left','top-right'].forEach(function(corner){
				el.appendChild(corner_el(corner, preset.corner_resolution))
			})
		}

		if(piece == 'front'){
			let screen = document.createElement("div")
			screen.className = "device-screen";
			screen.setAttribute("style", "background-image: url("+node.device.screenshot+")");
			el.appendChild(screen)
		}

		wrapper.appendChild(el);

	})

	let shadow = document.createElement("div")
	shadow.className = "device-shadow";
	let shadow_inner = document.createElement("div")
	shadow_inner.className = "device-shadow-inner";
	shadow.appendChild(shadow_inner)

	node.className = 'device'
	node.appendChild(shadow)
	node.appendChild(wrapper)

	node.dispatchEvent(events['device/load'])

}

// Dom elements

function corner_el(position, resolution){
	const el = document.createElement("div")
	el.className = "device-corner "+position
	let _previous_segment
	let rotation_per_segment = 90 / resolution;
	let width = 30 / resolution; // CHANGE THIS TO BORDER RADIUS * 1.5
	while(resolution){
		resolution--;
		let segment = document.createElement("div")
		segment.className = "device-corner-segment";
		segment.setAttribute("style", "transform: rotateY("+rotation_per_segment+"deg); width:"+width+"px");
		if(_previous_segment){
			_previous_segment.appendChild(segment)
		} else {
			el.appendChild(segment)
		}
		_previous_segment = segment
	}
	return el;
}

// Update all nodes
function update(){
	let _nodes = nodes;
	for(i in _nodes) render(_nodes[i])
}

// Render device
function render(node){
	node.dispatchEvent(events['device/update'])
}

// Extracts setting values
function extract_settings(string){
	let settings = {};
	if(!string) return settings;
	string.split(';').forEach(function(setting){
		let arr = setting.trim().split(':')
		if(!arr[0]) return;
		let key = arr[0].trim();
		let value = arr[1] ? arr[1].trim() : true;
		if(['numeric...'].indexOf(key) !== -1) value = parseInt(value)
		if(['numeric_map...'].indexOf(key) !== -1) value = value.split(',').map(function(value){ return parseFloat(value) })
		settings[key] = arr[1] ? value : true
	});
	return settings;
}

function add_preset(name, options){
	options.name = name
	presets[name] = options
}

// Bind resize event to update renders
function bind(){
	window.addEventListener('resize', update)
	window.setTimeout(function(){
		let event = document.createEvent("Event");
		event.initEvent("resize", false, true); 
		if(window.pageXOffset == 0) window.dispatchEvent(event);
	}, 60)
}

// Unbind events
function unbind(){
	window.removeEventListener('resize', update)
}

// Set default options
function init(options){
	add('[device]');
	bind();
}

const _interface = {
	add: add,
	remove: remove,
	bind: bind,
	unbind: unbind,
	init: init,
	add_preset: add_preset
};

window.device_preview = _interface;

module.exports = _interface;


// TEMP

var range_nodes = document.querySelectorAll('[type=range]')

range_nodes.forEach(function(node){
	node.addEventListener('input', function(e){
		document.querySelector('#'+e.target.attributes.id.nodeValue+'-value').innerHTML = e.target.value
		document.querySelectorAll('.device-wrapper').forEach(function(device){
			device.setAttribute("style", "transform: rotateX("+document.getElementById('x').value+"deg) rotateY("+document.getElementById('y').value+"deg) rotateZ("+document.getElementById('z').value+"deg);");
		})
		document.querySelectorAll('.device-shadow-inner').forEach(function(device){
			device.setAttribute("style", "transform: rotateX("+document.getElementById('x').value+"deg) rotateY("+document.getElementById('y').value+"deg) rotateZ("+document.getElementById('z').value+"deg);");
		})
	});
});