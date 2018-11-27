import {XtallatX, disabled} from 'xtal-latx/xtal-latx.js';
import {define} from 'xtal-latx/define.js';

const items = 'items';
const duration = 'duration';
const repeat = 'repeat';
const loop = 'loop';
const wait = 'wait';
export interface IValue{
    idx: number,
    item: any,
    time: Date
}

//const loop = 'loop';

export class TimeTicker extends XtallatX(HTMLElement){
    _idx: number = -1;
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
        if(this._wait){
            this.disabled = true;
        }
        this.onPropsChange();
    }
    set enabled(nv: any){
        if(nv) this.disabled = false;
    }
    static get properties(){
        return [disabled, items, duration, repeat, loop, wait];
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
        if(v) this.repeat = v.length;
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
    _loop!: boolean;
    get loop(){
        return this._loop;
    }
    set loop(nv){
        this.attr(loop, nv, '');
    }
    _wait!:boolean;
    get wait(){
        return this._wait;
    }
    set wait(nv){
        this.attr(wait, nv, '');
    }
    attributeChangedCallback(n: string, ov: string, nv: string){
        switch(n){
            case disabled:
                this._disabled = nv !== null;
                break;
            case items:
                this._items = JSON.parse(nv);
                break;
            case duration:
                this._duration = parseInt(nv);
                break;
            case repeat:
                this._repeat = parseInt(nv);
                break;
            case loop:
            case wait:
                (<any>this)['_' + n] = nv !== null;
                break;
        }
        this.onPropsChange();
    }
    _t: number[]  = [];
    onPropsChange(){
        if(this._disabled || !this._conn) return;
        if(this._idx === -1) {
            this.idx++;
            return;
        }
        if(this._idx >= this._repeat -1) {
            if(this.loop){
                this._idx = -1;
            }else{
                this.disabled = true;
                return;
            }
        }
        while(this._t.length > 0){
            const t = this._t.pop();
            clearTimeout(t);
        }
        
        this._t.push(setTimeout(() =>{
            this.idx++;
        }, this._duration));

    }
}
define(TimeTicker);