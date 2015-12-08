
var debug = require('debug');
var pf = require('util').format;
var of = require('zanner-typeof').typeOf;

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
	var levelKeys = Object.keys(LEVELs);
	levelKeys.forEach(function(key){
		levels[key] = debug(pf('%s:%s', key, name));
	});
	levels['unknown'] = debug(pf('unknown:%s', name));
	levels.log = function(level){
		var args = Array.prototype.slice.call(arguments, 1); //arguments.slice(1);
		if(of(level, 'string')){
			levels[levelKeys.some(function(v){return v==level;}) ? level : 'unknown'].apply(null, args);
		}
		else if(of(level, 'array')){
			for(var index in level){
				levels.log.apply(null, [level[index]].concat(args));
			}
		}
	};
	return levels;
};
