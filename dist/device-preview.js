window["device-preview"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

let nodes = [],
	opts = {},
	presets = {};


// Setup before first update
function add(selector, options){
	let _nodes = document.querySelectorAll(selector);
	_nodes = Array.prototype.slice.call(_nodes)
	for(i in _nodes) load(_nodes[i], options)
	nodes = nodes.concat(_nodes)
}

// Remove node from list to update
function remove(node){
	if(node.device.timeout) window.clearTimeout(node.device.timeout)
	nodes = nodes.filter(function(_node){ return _node !== node})
}

// Sets up initial classes on nodes
function load(node){

	node.device = {
		type: 'html',
	}

	if(node.attributes.device){
		let settings = node.attributes.device ? extract_settings(node.attributes.device.nodeValue) : {};
		for(setting in settings){
			node.device[setting] = settings[setting]
		}
	}

	let preset = presets[node.device.preset]

	node.device.preset = preset;

	if(!preset.gizmos) preset.gizmos = {}

	let resolution_values = preset.resolution.split(':')
	let resolution = resolution_values[1] / resolution_values[0]
	node.device.resolution = resolution_values

	let html = node.innerHTML;

	let style_string = 'padding-bottom: '+(resolution * 100)+'%;';

	if(!preset.styles) preset.styles = {}

	preset.styles['device-width'] = resolution_values[0]+'px';

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
					let dots = gizmo.dots;
					while(dots){
						dots--;
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
			if(node.device.image){
				screen.setAttribute("style", "background-image: url("+node.device.image+")");
			} else if(node.device.video){
				screen.innerHTML = '<video class="device-screen-video" autoplay muted loop><source src="'+node.device.video+'" type="video/mp4"></video>';
			} else if(node.device.iframe){
				screen.innerHTML = '<iframe class="device-screen-iframe" src="'+node.device.iframe+'""></iframe>';
			} else {
				screen.innerHTML = html;
			}
			el.appendChild(screen)
		}

		wrapper.appendChild(el);

	})

	let shadow = document.createElement("div")
	shadow.className = "device-shadow";
	let shadow_inner = document.createElement("div")
	shadow_inner.className = "device-shadow-inner";
	shadow.appendChild(shadow_inner)

	node.innerHTML = '';
	node.className = 'device'

	let scalar = document.createElement("div")
	scalar.className = "device-scalar "+(node.device.animation ? node.device.animation : '');
	scalar.setAttribute("style", 'width: '+node.device.resolution[0]+'px; height: '+(resolution * node.device.resolution[0])+'px;');
	scalar.appendChild(shadow)
	scalar.appendChild(wrapper)
	node.device.scalar = scalar

	node.appendChild(scalar)
	resize(node)

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
	for(i in _nodes) resize(_nodes[i])
}

// Render device
function resize(node){
	let width = node.device.resolution[0];
	let parent_width = node.parentNode.offsetWidth;
	node.device.scalar.style.transform = "scale("+(parent_width / width)+")"
}

// Extracts setting values
function extract_settings(string){
	let settings = {};
	if(!string) return settings;
	string.split(';').forEach(function(setting){
		let arr = setting.trim().split(/:(.+)/)
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

/***/ })
/******/ ]);
//# sourceMappingURL=device-preview.js.map