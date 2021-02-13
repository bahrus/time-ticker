import {xc, PropAction, PropDef, PropDefMap, ReactiveSurface} from 'xtal-element/lib/XtalCore.js';
import {IValue} from './types.d.js';
import {animationInterval} from './animationInterval.js';

const onIdxChange = ({idx, items, self}: TimeTicker) =>{
    if(idx === undefined) return;
    self.value = {
        idx: idx,
        item: (items && items.length > idx) ? items[idx] : null,
        time: new Date(),
    }
    self.dispatchEvent(new CustomEvent('tick', {
        detail: self.value
    }));
    if(self.wait){
        self.disabled = true;
    }
}
const onEnabled = ({enabled, self}: TimeTicker) => {
    self.disabled = !enabled;
}
const onItems = ({items, self}: TimeTicker) => {
    if(items === undefined) return;
    self.repeat = items.length;
}
const onDuration = ({duration, self}: TimeTicker) => {
    if(duration === undefined) return;
    // https://youtu.be/MCi6AZMkxcU?t=719 nope
    // https://youtu.be/MCi6AZMkxcU?t=918 nope
    // https://youtu.be/MCi6AZMkxcU?t=1152 nope
    // https://youtu.be/MCi6AZMkxcU?t=1169 nope
    // https://youtu.be/MCi6AZMkxcU?t=1189 nope
    // https://gist.github.com/jakearchibald/cb03f15670817001b1157e62a076fe95
    const controller = new AbortController();

    // Create an animation callback every second:
    animationInterval(1000, controller.signal, time => {
    console.log('tick!', time);
    });
}

const propActions = [onIdxChange, onEnabled, onItems, onDuration] as PropAction[];

/**
 * @element time-ticker
 * @event tick - Dispatched every time timer goes off
 */
export class TimeTicker extends HTMLElement implements ReactiveSurface{
    static is = 'time-ticker';
    /**
     * Current count
    */
    idx: number | undefined;// = -1;
    disabled: boolean | undefined;
    value: IValue | undefined;
    self = this;
    propActions = propActions;
    reactor = new xc.Rx(this);
    /**
     * Remove disabled
     */
    enabled: boolean | undefined;
    /**
     * Items to rotate through.
     * Sets property repeat to the number of items (length)
     * Attribute support (must be in JSON format)
     * @attr
     */
    items!: any[];

    /**
     * Number of milliseconds to wait
     * @attr
     */
    duration: number | undefined;

    /** 
     * Number of times to repeat before setting counter back to 0
     * Setting Items will set this automatically
     */
    repeat: number | undefined = Infinity;

    /**
     * Indicates whether should cycle or stop
     * @attr
     */
    loop: boolean | undefined;

    /**
     * Disable after every tick
     * @attr
    */
    wait: boolean | undefined;

    connectedCallback(){
        this.style.display = 'none';
        xc.hydrate<Partial<TimeTicker>>(this, slicedPropDefs, {
            idx: -1,
            duration: 1_000,
            repeat: Infinity,
        });
    }
    
    onPropChange(name: string, propDef: PropDef, newVal: any){
        this.reactor.addToQueue(propDef, newVal);
    }
}

const propDefMap: PropDefMap<TimeTicker> = {
    items:{
        type: Object
    },
    value: {
        type: Object,
    },
    idx: {
        type: Number,
        reflect: true,
    },
    enabled: {
        type: Boolean
    },

}
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(TimeTicker, slicedPropDefs.propDefs, 'onPropChange');
xc.define(TimeTicker);