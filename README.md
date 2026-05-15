# time-ticker

This package contains two exported modules:

1.  A light-weight, reusable, time-ticker [custom element feature](https://github.com/bahrus/assign-gingerly#custom-element-features).  It provides a precise atomic clock-like class that emits events on each tick.  It's been a while, and maybe the platform provides more official support for implementing precise tickers.  But as it stands, the logic for implementing the precise ticking is based on this [gist](https://gist.github.com/jakearchibald/cb03f15670817001b1157e62a076fe95) explained [here](https://youtu.be/MCi6AZMkxcU).