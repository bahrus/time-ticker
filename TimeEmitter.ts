export class TimeEmitter extends EventTarget{
    constructor(public ms: number, public signal: AbortSignal){
        super();
        this.scheduleFrame(this.start as DOMHighResTimeStamp);
    }

    emits = 'value-changed';

    start = document.timeline.currentTime!;

    frame = (time: DOMHighResTimeStamp) => {
        const {signal, emits} = this
        if (signal.aborted) {
            return;
        } 
        this.dispatchEvent(new CustomEvent(emits, {
            detail:{
                value: time,
            }
        }));
        this.scheduleFrame(time);
    }

    scheduleFrame = (time: DOMHighResTimeStamp) => {
        const {start, ms} = this
        const elapsed = time - start;
        const roundedElapsed = Math.round(elapsed / ms) * ms;
        const targetNext = start + roundedElapsed + ms;
        const delay = targetNext - performance.now();
        setTimeout(() => requestAnimationFrame(this.frame), delay);
    }

    
}