let nodes = [],
	opts = {},
	events = {};

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
function load(node, options){

	node.device = {
		screenshot: 'placeholder.png',
		corner_resolution: 5
	}

	if(node.attributes.device){
		let settings = node.attributes.device ? extract_settings(node.attributes.device.nodeValue) : {};
		for(setting in settings){
			node.device[setting] = settings[setting]
		}
	}

	if(options){
		for(opt in options){
			node.device[opt] = options[opt]
		}
	}

	['shadow','top','bottom','left','right','back'].forEach(ex => {
		const el = document.createElement("div")
		el.className = "device-"+ex;
		node.appendChild(el);
	})
	console.log(node.device)

	node.appendChild(corner_el('bottom-left', node.device.corner_resolution));
	node.appendChild(corner_el('bottom-right', node.device.corner_resolution));
	node.appendChild(corner_el('top-left', node.device.corner_resolution));
	node.appendChild(corner_el('top-right', node.device.corner_resolution));
	node.appendChild(underlay_el());
	node.appendChild(screenshot_el(node.device.screenshot));
	node.appendChild(overlay_el());

	node.dispatchEvent(events['device/load'])

}

// Dom elements

function corner_el(position, resolution){
	const el = document.createElement("div")
	el.className = "device-corner "+position
	let _previous_segment
	let rotation_per_segment = 90 / resolution;
	let width = 12 / resolution;
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
	console.log(el, resolution)
	return el;
}

function screenshot_el(screenshot){
	const el = document.createElement("div")
	el.className = "device-screenshot"
	el.setAttribute("style", "background-image: url("+screenshot+")");
	return el;
}

function underlay_el(){
	const el = document.createElement("div")
	el.className = "device-underlay"
	return el;
}

function overlay_el(){
	const el = document.createElement("div")
	el.className = "device-overlay"
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

init()

module.exports = {
	add: add,
	remove: remove,
	bind: bind,
	unbind: unbind,
	init: init
};


// TEMP

var range_nodes = document.querySelectorAll('[type=range]')

range_nodes.forEach(function(node){
	node.addEventListener('input', function(e){
		document.querySelector('#'+e.target.attributes.id.nodeValue+'-value').innerHTML = e.target.value
		nodes.forEach(function(device){
			device.setAttribute("style", "transform: rotateX("+document.getElementById('x').value+"deg) rotateY("+document.getElementById('y').value+"deg) rotateZ("+document.getElementById('z').value+"deg);");
		})
	});
});