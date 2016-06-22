# Dymo Core

I.e. to do with [dymo-core](https://github.com/florianthalmann/dymo-core).

## Ontologies, etc.

Dymos and renderings are specified in [JSON-LD](http://json-ld.org/), which is essentially JSON with the addition of an `@context` file which specifies RDF-style interpretations of various elements in the JSON structure. The JSON-LD context definition for dymos and renderings is [http://tiny.cc/dymo-context](http://tiny.cc/dymo-context) which resolves to [this file](https://raw.githubusercontent.com/florianthalmann/dymo-core/master/ontologies/context.json). 

From the dymo context, the following ontologies are referenced:
- "charm": "http://tiny.cc/charm-ontology", which does not resolve to a document
  - Specifically cdt, value and parts (-> hasPart)
- "dymo": "http://tiny.cc/dymo-ontology", which resolves to an OWL ontology
  - Specifically Dymo, Feature, Parameter, Amplitude, PlaybackRate, Pan, Distance, Reverb, PartCount, PartDurationRatio, PartProportion, and source
  - It references but does not use the Music Ontology, http://purl.org/ontology/mo/ and the Multitrack ontology, http://purl.org/ontology/studio/multitrack# 
- "mobile": "http://tiny.cc/mobile-audio-ontology",
  - Specifically a range of mappings, functions, sensor inputs and widgets.
  - It also reference the Music ontology but does not use it, the multitrack ontology, which is used only for AutomationParameter, and the dymo ontology, which is used for Dymo, Feature (from), and Parameter (to)

## Operation

Dymo operational semantics are not very clearly defined (IMO).

### Structure

The primary structure is the Dymo part-of hierarchy.

Each dymo is either atomic, referring to a particular start time and duration of an audio (source) file, or compount, specifying a list of child dymos.

The primitive audio Parameters (i.e. that can be manipulated) are: Amplitude, PlaybackRate, Pan, Filter (low-pass filter frequency), Delay (send level to delay effect), Reverb (send level to reverb effect). Setting a Parameter to a parent Dymo appears to affect the child, presumably multiplicatively, but this is unconfirmed. These Parameters directly change settings of the underlying web audio graph. 

Some Parameters are applied via the listener model (in the audio Scheduler): Distance, Height. 

There is a Loop parameter that applies to atomic dymos, but it is not clear if it applies to compound dymos.

There is a Play parameter. As of 2016-06-15 setting play on a dymo (at any level) creates a new thread to play that dymo independently from the beginning. Setting play to false immediately stops the play thread. (The semantic player normally sets play only on the top-level dymo.)

The full dymo hierarchy is typically static (only Parameters change during execution).

### Playback

A dymo is played by a Scheduler, specifically a scheduler Thread. This maintains a current set of atomic sources, which are dynamically instantiated as web audio buffers/etc in order to play. TimeStretchRatio is applied when a source is instantiated for an atomic dymo that is now be played.

The scheduler traverses the dymo hierarchy under the control of a tree of Navigrators, each of which is responsible for determining which children of a dymo to play next (or the dymo itself in the case of an atomic dymo).

The default navigator is a "sequential" navigator, although this will play children of a dymo with type "parallel" simultaneously, while other dymos are played in sequence.

Thus there are two largely orthogonal mechanisms: playing (stepping through) the dymo, under the control of the navigator(s), and dynamically modifying that playback, primarily by changes to Amplitude and perhaps Playback Ratio and/or Duration Ratio (which affect the time taken by each atomic dymo).

Setting/clearing the play parameter creates/destroys independent play threads, creating a further level of course-grained control.
  
