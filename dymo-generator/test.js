// dymo-generator test
var fs = require("fs");
//import pure js code this way for now
var math = require('./bower_components/mathjs/dist/math.js');
eval(fs.readFileSync('bower_components/dymo-core/dist/dymo-core.min.js')+'');
eval(fs.readFileSync('bower_components/dymo-generator/dist/dymo-generator.min.js')+'');

var loader = new FeatureLoader();
var barbeat =JSON.parse(fs.readFileSync('Stella_vamp_qm-vamp-plugins_qm-barbeattracker_beats.json'));
var tempo = JSON.parse(fs.readFileSync('Stella_vamp_qm-vamp-plugins_qm-tempotracker_tempo.json'));
var source = 'Stella.wav'

var generator = new DymoGenerator(undefined, function(){});

generator.setCondensationMode(MEAN);

//loader.loadFeature(barbeat, undefined, generator, function() { console.log('loaded barbeat'); });

//if (false) 
DymoTemplates.createAnnotatedBarAndBeatDymo(generator, [barbeat /*, tempo*/], function() {
	var dymo = generator.getDymo();
	dymo.setSourcePath(source);
	fs.writeFile('dymo.json', JSON.stringify(dymo.toJsonHierarchy()));
});
