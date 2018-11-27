import {XtallatX, disabled} from 'xtal-latx/xtal-latx.js';
import {define} from 'xtal-latx/define.js';

const items = 'items';
const duration = 'duration';
const repeat = 'repeat';

export interface IValue{
    idx: number,
    item: any,
    time: Date
}

//const loop = 'loop';

export class TimeTicker extends XtallatX(HTMLElement){
    _idx: number = 0;
    value!: IValue;
    get idx(){
        return this._idx;
    }
    set idx(nv){
        this._idx = nv;
        this.attr('tick', nv.toString());
        this.value = {
            idx: nv,
            item: (this._items && this._items.length > nv) ? this._items[nv] : null,
            time: new Date(),
        };
        this.de('tick', this.value, true);
        this.onPropsChange();
    }
    static get properties(){
        return [disabled, items, duration, repeat];
    }
    static get is(){return 'time-ticker';}
    _conn!: boolean;
    connectedCallback(){
        this.style.display = 'none';
        super._upgradeProperties(TimeTicker.properties);
        this._conn = true;
        this.onPropsChange();
    }
    static get observedAttributes(){
        return TimeTicker.properties;
    }
    _items!: any[];
    get items(){
        return this._items;
    }
    set items(v){
        this._items = v;
    }
    _duration: number = 1000;
    get duration(){
        return this._duration;
    }
    set duration(nv){
        this.attr(duration, nv.toString());
    }
    _repeat: number = Infinity;
    get repeat(){
        return this._repeat;
    }
    set repeat(nv){
        this.attr(repeat, nv.toString());
    }
    
    attributeChangedCallback(n: string, ov: string, nv: string){
        switch(n){
            case disabled:
                this._disabled = nv !== null;
                if(!this._disabled){
                    this._idx = 0;
                }
            case items:
                this._items = JSON.parse(nv);
                break;
            case duration:
                this._duration = parseInt(nv);
                break;
            case repeat:
                this._repeat = parseInt(nv);
                break;
        }
        this.onPropsChange();
    }
    onPropsChange(){
        if(this._disabled || !this._conn) return;
        if(this._idx > this._repeat) {
            this.disabled = true;
            return;
        }
        setTimeout(() =>{
            this.idx++;
        }, this._duration);
    }
}
define(TimeTicker);