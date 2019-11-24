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
	presets = {
		mobile: {
			resolution: '360:640',
			corner_resolution: 10,
			styles: {
				'border-radius': '20px',
				'color-a': '#232629',
				'color-b': '#121314'
			},
			gizmos: {
				bottom: [
					{ type: 'speaker', position: 'left', dots: 4 },
					{ type: 'power', position: 'center' },
					{ type: 'jack', position: 'right' },
				],
				left: [
					{ type: 'speaker', position: 'bottom', dots: 2 }
				],
				front: [
					{ type: 'button', position: 'bottom-center' },
					{ type: 'camera', position: 'top-left' },
				]
			}
		},
		mobile_sharp: {
			resolution: '340:600',
			corner_resolution: 3,
			styles: {
				'thickness': '20px',
				'border-radius': '5px',
				'screen-border-radius': '5px',
				'color-a': '#fafffd',
				'color-b': '#e1f2ec',
				'front-top-offset': '0px',
				'front-bottom-offset': '0px',
			},
			gizmos: {
				bottom: [
					{ type: 'speaker', position: 'left', dots: 4 },
					{ type: 'power', position: 'center' },
					{ type: 'jack', position: 'right' },
				],
				left: [
					{ type: 'speaker', position: 'bottom', dots: 2 }
				]
			}
		},
		tablet: {
			resolution: '600:450',
			corner_resolution: 12,
			styles: {
				'thickness': '15px',
				'border-radius': '15px',
				'screen-border-radius': '15px',
				'color-a': '#8f8979',
				'color-b': '#ded5bf',
				'front-top-offset': '0px',
				'front-bottom-offset': '0px',
			},
			gizmos: {
				bottom: [
					{ type: 'speaker', position: 'left', dots: 4 },
					{ type: 'power', position: 'center' },
					{ type: 'jack', position: 'right' },
				],
				left: [
					{ type: 'speaker', position: 'bottom', dots: 2 }
				]
			}
		},
		thick: {
			resolution: '320:320',
			corner_resolution: 12,
			styles: {
				'thickness': '45px',
				'border-radius': '15px',
				'screen-border-radius': '15px',
				'color-a': '#5dcf9f',
				'color-b': '#c0eb78',
			},
			gizmos: {
				bottom: [
					{ type: 'speaker', position: 'left', dots: 4 },
					{ type: 'power', position: 'center' },
					{ type: 'jack', position: 'right' },
				],
				left: [
					{ type: 'speaker', position: 'bottom', dots: 2 }
				],
				front: [
					{ type: 'button', position: 'bottom-center' },
					{ type: 'camera', position: 'top-left' },
					{ type: 'html', position: 'top-right', 'content': 'Thick' },
				],
				top: [
					{ type: 'speaker', position: 'center', dots: 4 },
				]
			}
		},
	};


// Setup before first update
function add(selector, options){
	let _nodes = document.querySelectorAll(selector);
	_nodes = Array.prototype.slice.call(_nodes)
	for(i in _nodes) load(_nodes[i], options)
	nodes = nodes.concat(_nodes)
}

// Sets up initial classes on nodes
function load(node){

	node.device = {
		type: 'html',
		preset: 'mobile'
	}

	// Extract settings from device attribute

	if(node.attributes.device){
		const settings = node.attributes.device ? extract_settings(node.attributes.device.nodeValue) : {};
		for(setting in settings){
			node.device[setting] = settings[setting]
		}
	}

	// Get preset and resolution settings

	const preset = presets[node.device.preset]
	const innerHTML = node.innerHTML;
	const resolution_values = preset.resolution.split(':')
	const resolution = resolution_values[1] / resolution_values[0]

	// Create wrapper and containing section elements

	let wrapper = create_el("device-wrapper");

	['back','left','right','top','bottom','corners','front'].forEach(piece => {

		const el = create_el("device-"+piece)

		// Add gizmos to piece

		if(preset.gizmos[piece]){
			preset.gizmos[piece].forEach(function(gizmo) {
				let gizmo_el = create_el("device-gizmo device-gizmo-"+gizmo.position+" device-"+gizmo.type)
				if(gizmo.type == 'speaker'){
					let dots = gizmo.dots;
					while(dots){
						dots--;
						gizmo_el.appendChild(create_el("device-speaker-dot"))
					}
				}
				if(gizmo.type == 'html'){
					gizmo_el.innerHTML = gizmo.content
				}
				el.appendChild(gizmo_el)
			})
		}

		// Add corner pieces

		if(piece == 'corners'){
			['bottom-left','bottom-right','top-left','top-right'].forEach(function(corner){
				el.appendChild(corner_el(preset, corner, preset.corner_resolution))
			})
		}

		// Add front pieces

		if(piece == 'front'){
			let screen = create_el("device-screen")
			if(node.device.image){
				screen.setAttribute("style", "background-image: url("+node.device.image+")");
			} else if(node.device.video){
				screen.innerHTML = '<video class="device-screen-video" autoplay muted loop><source src="'+node.device.video+'" type="video/mp4"></video>';
			} else if(node.device.iframe){
				screen.innerHTML = '<iframe class="device-screen-iframe" src="'+node.device.iframe+'""></iframe>';
			} else {
				screen.innerHTML = innerHTML;
			}
			el.appendChild(screen)
		}

		wrapper.appendChild(el);

	})

	// Create shadow and scalar layers

	let shadow = create_el("device-shadow")
	shadow.appendChild(create_el("device-shadow-inner"))
	let scalar = create_el("device-scalar "+(node.device.animation ? node.device.animation : ''), 'width: '+resolution_values[0]+'px; height: '+(resolution * resolution_values[0])+'px;')
	scalar.appendChild(shadow)
	scalar.appendChild(wrapper)

	// Store values on node for usage in updating

	node.device.scalar = scalar
	node.device.preset = preset;
	node.device.resolution_values = resolution_values
	node.device.resolution = resolution

	// Set root class and append children

	set_style(node)
	node.innerHTML = '';
	node.className = 'device'
	node.appendChild(scalar)
	resize(node)

}

// Dom elements

function create_el(className, styles){
	let _el = document.createElement("div")
	if(className) _el.className = className;
	if(styles) _el.setAttribute("style", styles);
	return _el;
}

// Set variables from styles in preset

function set_style(node, append){
	let style_string = 'padding-bottom: '+(node.device.resolution * 100)+'%;';
	node.device.preset.styles['device-width'] = node.device.resolution_values[0]+'px';
	if(node.device.preset.styles) Object.keys(node.device.preset.styles).forEach(function(key){
		style_string += '--'+key+': '+node.device.preset.styles[key]+';';
	})
	if(append) style_string += append;
	node.setAttribute("style", style_string);
}

function corner_el(preset, position, resolution){
	const el = create_el("device-corner "+position)
	let _previous_segment
	let rotation_per_segment = 90 / resolution;
	let width = (parseInt(preset.styles['border-radius']) * 1.55) / resolution;
	while(resolution){
		resolution--;
		let segment = create_el("device-corner-segment", "transform: rotateY("+rotation_per_segment+"deg); width:"+width+"px")
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
	if(!node.parentNode) return;
	let width = node.device.resolution_values[0];
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
		settings[key] = arr[1] ? value : true
	});
	return settings;
}

function add_preset(name, options){
	options.name = name
	presets[name] = options
}

// Set default options
function init(){
	add('[device]');
	window.addEventListener('resize', update)
	window.setTimeout(function(){
		let event = document.createEvent("Event");
		event.initEvent("resize", false, true); 
		if(window.pageXOffset == 0) window.dispatchEvent(event);
	}, 60)
}

const _interface = {
	add: add,
	init: init,
	load: load,
	add_preset: add_preset,
	set_style: set_style
};

window.device_preview = _interface;
module.exports = _interface;


/***/ })
/******/ ]);
//# sourceMappingURL=device-preview.js.map