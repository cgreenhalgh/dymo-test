import { DymoGenerator, forAll, uris } from 'dymo-core';
import { DymoWriter, DymoDefinition } from './dymo-writer';


new DymoWriter('src/assets/dymos/', 'src/assets/config.json').generateAndWriteDymos([
  {name: 'uon1', path: 'uon1/', func: createSimpleDymo}
]);


async function createSimpleDymo(dymoGen: DymoGenerator) {
  const dymo = await dymoGen.addDymo(undefined, 'loop.wav');
  await dymoGen.setDymoParameter(dymo, uris.LOOP, 1);
  let slider = await dymoGen.addControl("Amp", uris.SLIDER);
  await dymoGen.addConstraint(
    forAll("d").in(dymo).forAll("c").in(slider).assert("Amplitude(d) == c"));
}
