# Sonic Annotator stuff

See [sonic annotator](http://www.vamp-plugins.org/sonic-annotator/).

## Install

On Ubuntu [download](https://code.soundsoftware.ac.uk/projects/sonic-annotator/files) current Linux 64 bit debian package and install will 
```
sudo dpkg -i sonic-annotator*.deb
```
Fix dependencies if required:
```
sudo apt-get install -f
```
Also download and install the QM plugins, e.g. [for linux](https://code.soundsoftware.ac.uk/attachments/download/1602/qm-vamp-plugins-linux64-v1.7.1.tar.bz2). See the README for installation (copy to `/usr/local/lib/vamp/`).

## Use

For example, if sound files in `snd/` and RDF output to `rdf/`:
```
sonic-annotator -t ./config/ilm222.n3 ./snd/* -w rdf --rdf-basedir ./rdf/  --rdf-many-files 
```

