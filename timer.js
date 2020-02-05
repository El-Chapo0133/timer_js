"use strict";
class Timer {
    constructor(...args) {
        this.setArgs(args);
    }
    /** getter-setter  */
    get Count() {
        return this.count;
    }
    get IsRunning() {
        return this.run;
    }
    get Interval() {
        return this.interval;
    }
    set Interval(value) {
        this.interval = value;
    }
    set Event(value) {
        this.event = value;
    }
    start() {
        if (!this.run) {
            this.run = true;
            this.loop();
        }
        else
            console.log("timer already started");
    }
    stop() {
        if (this.run)
            this.run = false;
        else
            console.log("timer slread stopped");
    }
    getMilliSeconds() {
        return this.count;
    }
    getSeconds() {
        return this.count / 1000;
    }
    getMinutes() {
        return (this.count / 1000) / 60;
    }
    getHours() {
        return ((this.count / 1000) / 60) / 60;
    }
    setArgs(...args) {
        args.forEach((arg) => {
            switch (typeof arg) {
                case "number": {
                    this.interval = arg;
                    break;
                }
                case "function": {
                    this.event = arg;
                    break;
                }
                default: {
                    console.log(`undefined type:${typeof arg}`);
                    break;
                }
            }
        });
    }
    loop() {
        setTimeout(() => {
            this.event();
            this.nextLoop();
        }, this.interval);
    }
    nextLoop() {
        if (this.continue())
            this.loop();
    }
    continue() {
        return this.run;
    }
}
