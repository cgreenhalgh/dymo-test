var fs = require('fs');
for (var i=2; i<process.argv.length; i++) {
  var fname = process.argv[i];
  if (process.argv.length>3)
    console.log('=== '+fname+' ===');
  try {
    var file = fs.readFileSync(fname,'utf8');
    var json = JSON.parse(file);
    var pretty = JSON.stringify(json,null,4);
    console.log(pretty);
  } catch (err) {
    console.error('Error reading/parsing '+fname+': '+err.message);
  }
}
