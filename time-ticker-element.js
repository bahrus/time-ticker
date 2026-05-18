export class TimeTickerElement extends HTMLElement {
    propagator = new EventTarget();
    #internals;

    static formAssociated = true;

    static supportedFeatures = { 
        timeTicker: {}, 
        roundabout: {}, 
        truthSourcer: {
            callbackForwarding: ['connectedCallback', 'attributeChangedCallback'],
            getSharedContext(instance) {
                return {
                    hostPropagator: instance.propagator
                };
            }
        },
        faceUp: {
            callbackForwarding: ['connectedCallback', 'disconnectedCallback', 'formDisabledCallback', 'formResetCallback', 'formStateRestoreCallback'],
            getSharedContext(instance) {
                return {
                    internals: instance.#internals,
                };
            }
        }
    }

    constructor() {
        super();
        this.#internals = this.attachInternals();
    }
}