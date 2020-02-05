class Timer {
	private count :number;
	private interval :number;
	private run :boolean;
	private event :Function;

	/** getter-setter  */
	get Count() :number {
		return this.count;
	}
	get IsRunning() :boolean {
		return this.run;
	}
	get Interval() :number {
		return this.interval;
	}
	set Interval(value :number) {
		this.interval = value;
	}
	set Event(value :Function) {
		this.event = value;
	}

	public constructor(...args) {
		this.setArgs(args);
	}
	public start() :void {
		if (!this.run) {
			this.run = true;
			this.loop();
		} else
			console.log("timer already started");
	}
	public stop() :void {
		if (this.run)
			this.run = false;
		else
			console.log("timer slread stopped");
	}
    public getMilliSeconds() {
        return this.count;
    }
    public getSeconds() :number {
        return this.count / 1000;
    }
    public getMinutes() :number {
        return (this.count / 1000) / 60;
    }
    public getHours() :number {
        return ((this.count / 1000) / 60) / 60;
    }
	private setArgs(...args) {
		args.forEach((arg) => {
			switch(typeof arg) {
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
	private loop() :void {
		setTimeout(() => {
			this.event();
			this.nextLoop();
		}, this.interval);
	}
	private nextLoop() :void {
		if (this.continue())
			this.loop();
	}
	private continue() :boolean {
		return this.run;
	}
}