# Semantic Player

Stuff to do with QM Semantic Player, [github](https://github.com/florianthalmann/semantic-player)...

Chris Greenhalgh, The University of Nottingham, 2016

## Install

- [Vagrantfile](Vagrantfile) for creating suitable Ubuntu-based build environment. Note that manual steps are required for Android (Java and Android SDK).

## Use

From [README](https://github.com/cgreenhalgh/semantic-player/blob/master/README.md):
-	“Declare the added dymos in the www/config.json file by adding them to the "dymos" list.”
-	Example dymos in [example-dymos](https://github.com/florianthalmann/example-dymos.git)

Essentially the semantic player creates a DymoManager which loads a dymo and a rendering, creates any controls, and plays the dymo.

See [dymo-core](../dymo-core/README.md)

## Authoring

Nominally you can use [dymo-designer](https://github.com/florianthalmann/dymo-designer.git), although as of 2016-05-06 this does not have npm or bower dependencies, and appears incompatible with the current version of dymo packages in bower.

Nominally you can also use [dymo-generator](https://github.com/florianthalmann/dymo-generator), although this is a bower/npm package without and exectuble commands and with no documentation.

## Operational Notes

It will attempt to load all audio at the start of execution. This disables the dymo-core support for on-demand loading from the proprietary [audio server](https://github.com/florianthalmann/audio-server) (which would probably only work with WAV files).

WebAudio support on lots of Android default browsers is poor/non-existing, so especially on devices before Android 5 you will need to use the alternative crosswalk browser (supported by ionic).
