export class TimeEmitter extends EventTarget {
    ms;
    signal;
    constructor(ms, signal) {
        super();
        this.ms = ms;
        this.signal = signal;
        this.scheduleFrame(this.start);
    }
    emits = 'value-changed';
    start = document.timeline.currentTime;
    frame = (time) => {
        const { signal, emits } = this;
        if (signal.aborted)
            return;
        this.dispatchEvent(new CustomEvent(emits, {
            detail: {
                value: time,
            }
        }));
        this.scheduleFrame(time);
    };
    scheduleFrame = (time) => {
        const { start, ms } = this;
        const elapsed = time - start;
        const roundedElapsed = Math.round(elapsed / ms) * ms;
        const targetNext = start + roundedElapsed + ms;
        const delay = targetNext - performance.now();
        setTimeout(() => requestAnimationFrame(this.frame), delay);
    };
}
