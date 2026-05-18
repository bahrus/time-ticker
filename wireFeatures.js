import { TimeTicker } from './TimeTicker.js';
import { RoundaboutFeature } from 'roundabout-lib/RoundaboutFeature.js';
import { TruthSourcer } from 'truth-sourcer/TruthSourcer.js';
import { FaceUp } from 'face-up/FaceUp.js';
import 'assign-gingerly/assignFeatures.js';

export async function wireFeatures(ElementClass, cfg) {
    const { roundabout } = cfg.features;
    const { customData, withAttrs } = roundabout;
    
    await customElements.assignFeatures(ElementClass, {
        timeTicker: { spawn: TimeTicker },
        roundabout: {
            spawn: RoundaboutFeature,
            customData,
            withAttrs,
            callbackForwarding: ['connectedCallback'],
        },
        truthSourcer: { spawn: TruthSourcer },
        faceUp: { spawn: FaceUp }
    });
}