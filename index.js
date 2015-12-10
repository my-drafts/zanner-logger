
var debug = require('debug');
var pf = require('util').format;
var of = require('zanner-typeof').of;

var LEVELs = {
	error: 0,
	warning: 1,
	notice: 2,
	info: 4,
	debug: 8
};

module.exports = function(_name){
	var name = of(_name, 'string') && _name.length>0 ? _name : '???';
	var levels = {};
	var levelKeys = Object.keys(LEVELs).map(function(key){
		levels[key] = debug(pf('%s:%s', key, name));
		return key;
	});
	levels['unknown'] = debug(pf('unknown:%s', name));
	levels.log = function(level){
		var args = Array.prototype.slice.call(arguments, 1); //arguments.slice(1);
		if(of(level, 'string')){
			levels[levelKeys.some(function(v){return v==level;}) ? level : 'unknown'].apply(null, args);
		}
		else if(of(level, 'array')){
			for(var index in level){
				levels.log.apply(this, [level[index]].concat(args));
			}
		}
	};
	return levels;
};
