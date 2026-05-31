import { TimeTicker } from './TimeTicker.js';
import 'assign-gingerly/assignFeatures.js';

/**
 * Determines if a function is an async spawner (same heuristic as assignFeatures).
 */
function isAsyncSpawn(fn) {
    if (typeof fn !== 'function') return false;
    if (fn.constructor.name === 'AsyncFunction') return true;
    if (fn.prototype === undefined) return true;
    return false;
}

export async function wireFeatures(ElementClass, cfg) {
    const { roundabout } = cfg.features;
    const { customData, withAttrs } = roundabout;

    const supportedFeatures = ElementClass.supportedFeatures;

    // Build the features config
    const featuresConfig = {
        timeTicker: { spawn: TimeTicker },
        truthSourcer: {
            callbackForwarding: ['connectedCallback', 'attributeChangedCallback'],
        },
        faceUp: {
            customData: { integrateWithRoundabout: true },
            callbackForwarding: [
                'connectedCallback', 'disconnectedCallback',
                'formDisabledCallback', 'formResetCallback', 'formStateRestoreCallback',
            ],
        },
        roundabout: {
            customData,
            withAttrs,
            callbackForwarding: ['connectedCallback'],
        },
    };

    // Resolve async fallback spawns before calling assignFeatures
    await Promise.all(Object.entries(featuresConfig).map(async ([key, featureConfig]) => {
        if (featureConfig.spawn) return; // already has a synchronous spawn
        const optIn = supportedFeatures[key];
        if (!optIn?.fallbackSpawn) return;
        let spawn = optIn.fallbackSpawn;
        if (isAsyncSpawn(spawn)) {
            spawn = await spawn();
        }
        featureConfig.spawn = spawn;
    }));

    await customElements.assignFeatures(ElementClass, featuresConfig);
}
