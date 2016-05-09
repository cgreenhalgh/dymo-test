// dymo-generator test
var fs = require("fs");
//import pure js code this way for now
var math = require('./bower_components/mathjs/dist/math.js');
eval(fs.readFileSync('bower_components/dymo-core/dist/dymo-core.min.js')+'');
eval(fs.readFileSync('bower_components/dymo-generator/dist/dymo-generator.min.js')+'');
// RDF
var N3 = require('n3');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var loader = new FeatureLoader();
// JSON
//var barbeat =JSON.parse(fs.readFileSync('Stella_vamp_qm-vamp-plugins_qm-barbeattracker_beats.json'));
//var tempo = JSON.parse(fs.readFileSync('Stella_vamp_qm-vamp-plugins_qm-tempotracker_tempo.json'));
// Note: MFCC is only one produces af:value
//var mfcc = JSON.parse(fs.readFileSync('Stella_vamp_qm-vamp-plugins_qm-mfcc_coefficients.json'));
var source = 'Stella.wav'

//var json = tempo; //barbeat;
//console.log('hoping for file_metadata: '+JSON.stringify(Object.keys(json)[0]));
//console.log('hoping for annotations: '+JSON.stringify(Object.keys(json)[1]));
//console.log('output_id: '+json[Object.keys(json)[1]][0].annotation_metadata.annotator.output_id);

// RDF
var barbeat = "file:///home/vagrant/dymo-test/dymo-generator/Stella_vamp_qm-vamp-plugins_qm-barbeattracker_beats.n3";
var tempo = "file:///home/vagrant/dymo-test/dymo-generator/Stella_vamp_qm-vamp-plugins_qm-tempotracker_tempo.n3";
var mfcc = "file:///home/vagrant/dymo-test/dymo-generator/Stella_vamp_qm-vamp-plugins_qm-mfcc_coefficients.n3";//"http://www.cs.nott.ac.uk/~pszcmg/Music/Stella_vamp_qm-vamp-plugins_qm-mfcc_coefficients.n3";

var generator = new DymoGenerator(undefined, function(){});

generator.setCondensationMode(MEAN);

//generator.addDymo(undefined,source);

//loader.loadFeature(barbeat, undefined, generator, function() { console.log('loaded barbeat'); });
//loader.loadFeature(mfcc, undefined, generator, function() { console.log('loaded mfcc'); });

//if (false) 
DymoTemplates.createAnnotatedBarAndBeatDymo(generator, [barbeat, mfcc, tempo], function() {
	var dymo = generator.getDymo();
	dymo.setSourcePath(source);
	fs.writeFile('dymo.json', JSON.stringify(dymo.toJsonHierarchy(), null, 4));
});
