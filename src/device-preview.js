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
	let _nodes = opts.context.querySelectorAll(selector);
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

	node.device = {}

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

	node.dispatchEvent(events['device/load'])

}

// Update all nodes
function update(){
	let _nodes = nodes;
	for(i in _nodes) toggle(_nodes[i], visible)
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
		if(['delay', 'offset', 'delay_all'].indexOf(key) !== -1) value = parseInt(value)
		if(['in_view'].indexOf(key) !== -1) value = value.split(',').map(function(value){ return parseFloat(value) })
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
	if(opts.context){
		add('[device]');
	}
	bind();
}

module.exports = {
	add: add,
	remove: remove,
	bind: bind,
	unbind: unbind,
	init: init
};