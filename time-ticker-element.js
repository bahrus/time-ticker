export class TimeTickerElement extends HTMLElement {
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
        }
    }
}