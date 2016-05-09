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
- if reading from n3 gives meaningless exceptions if file doesn't load successfully.
- tempo feature doesn't generate anything in output
- generates dymo with: one top-level dymo, with time & duration features, and parts which seems to include longer parts with a single sub-part usually the same length (bars?!) followed by shorter atomic parts (beats 2,3,4?).
