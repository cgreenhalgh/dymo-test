# Dymo Generator notes

Relating to [dymo-generator](https://github.com/florianthalmann/dymo-generator).

This is a bower package, which has some utilities for creating dymos.

It supports reading features from JSON (JAMS or JSON-LD) or n3 (RDF) files, but assumes that there is only one feature in each file.

It is mostly interested in beat and tempo features.

Typically beat (and other event) features are used to segment the audio file. For the bar and beat features this is a two-level segmentation into bars (beat = "1") and beats.

Non-event features are added as features. In the case of RDF this may only be MFCC coefficients (? looks for a `value`).


Chris Greenhalgh, The University of Nottingham, 2016

## Issues

initial `test.js`, which tries to do DymoTemplates.createAnnotatedBarAndBeatDymo
- if reading bar and beats from JSON, output single top-level dymo with no time information
- if reading tempo from JAMS, throws exception with .value of udefined in DymoGenerator.addFeature, possibly because time is primitive.
- if reading bar and beats from n3, seems to be a similar problem with split of undefined perhaps on subject or object of af:value (which is not present in n3).
