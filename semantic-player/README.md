# Semantic Player

Stuff to do with QM Semantic Player, [github](https://github.com/dynamic-music/semantic-player)...

Chris Greenhalgh, The University of Nottingham, 2016-2018

In progress of updating, Nov. 2018...

## Install

- [Vagrantfile](Vagrantfile) for creating suitable Ubuntu-based build environment. Note that manual steps are required for Android (Java and Android SDK).

```
git clone https://github.com/dynamic-music/semantic-player.git
cd semantic-player

sudo npm install -g cordova ionic

npm install
#ionic resources
```

Make dymos - undocumented
```
cd generator
`npm bin`/tsc
cd ..
mkdir src/assets/dymos
node generator/lib/example-dymos.js
```

Local web:
```
ionic serve  --address 0.0.0.0
```
Open browser at http://localhost:8100

Error:
```
Error while trying to use the following icon from the Manifest: http://localhost:8100/assets/imgs/logo.png (Download error or resource isn't a valid image)
tone-object.js:93 Tone.Buffer: could not locate file: assets/dymos/loop/loop.wav
tone-object.js:93 Tone.Buffer: could not locate file: assets/dymos/example/creak.wav
```
This is the first dymo listed in [src/assets/config.json](https://github.com/dynamic-music/semantic-player/blob/master/src/assets/config.json), and there's no sign of it in the git repo.

Looks like they are made by something in `generator/`, which needs tsc

Stop here for now...

## More old stuff to work through

Android - also needs lots of other local deps:
```
#ionic browser add crosswalk
#ionic add platform android
#ionic build android
```
if ionic resources fails...
```
sudo apt-get install -y imagemagick
sudo npm install cordova-splash --no-bin-links
sudo npm install cordova-icon --no-bin-links
cp resources/icon.png .
./node_modules/cordova-icon/bin/cordova-icon
cp resources/splash.png .
./node_modules/cordova-splash/bin/cordova-splash
 ```


## Use

From [README](https://github.com/cgreenhalgh/semantic-player/blob/master/README.md):
-	Declare the added dymos in the www/config.json file by adding them to the "dymos" list.
-	Example dymos in [example-dymos](https://github.com/florianthalmann/example-dymos.git)

Essentially the semantic player creates a DymoManager which loads a dymo and a rendering, creates any controls, and plays the dymo.

See [dymo-core](../dymo-core/README.md)

## Authoring

Nominally you can use [dymo-designer](https://github.com/florianthalmann/dymo-designer.git), although as of 2016-05-06 this does not have npm or bower dependencies, and appears incompatible with the current version of dymo packages in bower.

Nominally you can also use [dymo-generator](https://github.com/florianthalmann/dymo-generator), although this is a bower/npm package without and exectuble commands and with no documentation.

## Operational Notes

It will attempt to load all audio at the start of execution. This disables the dymo-core support for on-demand loading from the proprietary [audio server](https://github.com/florianthalmann/audio-server) (which would probably only work with WAV files).

WebAudio support on lots of Android default browsers is poor/non-existing, so especially on devices before Android 5 you will need to use the alternative crosswalk browser (supported by ionic).

Currently glitchy audio playout on a galaxy nexus 4.3.1 using crosswalk. Perhaps increase `SCHEDULE_AHEAD_TIME` in `src/globals.js`?