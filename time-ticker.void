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
const onDuration = ({duration, disabled, self}: TimeTicker) => {
    if(duration === undefined) return;
    if(disabled){
        if(self.controller !== undefined){
            self.controller.abort();
            delete self.controller;
            return;
        }
    }
    if(self.controller) return;
    // https://youtu.be/MCi6AZMkxcU?t=719 nope
    // https://youtu.be/MCi6AZMkxcU?t=918 nope
    // https://youtu.be/MCi6AZMkxcU?t=1152 nope
    // https://youtu.be/MCi6AZMkxcU?t=1169 nope
    // https://youtu.be/MCi6AZMkxcU?t=1189 nope
    // https://gist.github.com/jakearchibald/cb03f15670817001b1157e62a076fe95
    self.controller = new AbortController();

    // Create an animation callback every second:
    animationInterval(duration, self.controller.signal, time => {
        self.nextIdx();
    });
    self.nextIdx();
}

const propActions = [onIdxChange, onEnabled, onItems, onDuration] as PropAction[];
const obj: PropDef = {
    type: Object,
    async: true
}
const bool: PropDef = {
    type: Boolean,
    async: false,
    reflect: true,
}
const num: PropDef = {
    type: Number,
    async: true,
    reflect: true,
}
const propDefMap: PropDefMap<TimeTicker> = {
    items: obj, value:obj,
    idx: num, duration: num, repeat: num,
    enabled: bool, disabled: bool, loop: bool, wait: bool,
}
/**
 * @element time-ticker
 * @event tick - Dispatched every time timer goes off
 */
export class TimeTicker extends HTMLElement implements ReactiveSurface{
    static is = 'time-ticker';
    static observedAttributes = ['disabled'];
    self = this;
    propActions = propActions;
    reactor = new xc.Rx(this);
    controller: AbortController | undefined;
    /**
     * Current count
    */
   idx: number | undefined;// = -1;
   disabled: boolean | undefined;
   value: IValue | undefined;
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
    attributeChangedCallback(n: string, ov: string, nv: string){
        this.disabled = nv !== null;
    }
    connectedCallback(){
        this.style.display = 'none';
        xc.hydrate<Partial<TimeTicker>>(this, slicedPropDefs, {
            idx: -1,
            duration: 1_000,
            repeat: Infinity,
            enabled: true,
        });
    }
    
    onPropChange(name: string, propDef: PropDef, newVal: any){
        this.reactor.addToQueue(propDef, newVal);
    }

    nextIdx(){
        let newIdx = this.idx!;
        if(newIdx >= this.repeat! - 1){
            if(this.loop){
                newIdx = -1;
            }else{
                this.disabled = true;
                return;
            }
        }
        this.idx = newIdx + 1;
    }
}


const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(TimeTicker, slicedPropDefs.propDefs, 'onPropChange');
xc.define(TimeTicker);