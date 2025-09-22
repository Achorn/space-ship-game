import lazerSound from "../../../static/audio/impacts/sfx_sounds_impact4.wav";
import explosionSound from "../../../static/audio/explosions/sfx_exp_short_soft10.wav";
import impactSound from "../../../static/audio/explosions/sfx_exp_shortest_soft9.wav";
// This is where my sound will be controlled.

/**
 * my idea is to have this be my sound api where all you need to do is call emit sounds and choose what sound you want to emit.
 *
 * Game.soundController.emit(sound, distance from )
 */

//STEP A
//find sound (lazer)
var sfx = {
  lazer: new Howl({
    src: lazerSound,
  }),
  impact: new Howl({
    src: impactSound,
  }),
  explosion: new Howl({
    src: explosionSound,
  }),
};
export default sfx;
// add one audio to game (lazer)

// connect sound controller to game class.

// have lazer sound emit when shooting lazer.

//STEP 2

// find more sounds (explosion, flying sound, impact sound, animated text, menu travel, menu select, back forward, transition sounds )

// update class to handle multiple options. and have api easy and clear to talk to

//start adding more dinamic sounds (variation, distance. volume etc)

// dont forget to have fun.

//
