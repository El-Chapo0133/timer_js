const THOUSAND = 1000
const SIXTY = 60

/**
 * class Timer
 * @param {interval wanted}             p_interval 
 * @param {function to do every loop}   callback 
 */
function Timer(p_interval, callback) {
    /** object params */
    // set default interval to 1s
    this.interval = p_interval
    // default interval of timer
    this.defaultInterval = 10
    // set default to not run
    this.run = false
    // number of event generated
    this.count = 0
    /**
     * constructor of the class
     * @param {interval wanted} p_interval
     */
    this.construct = (p_interval) => {
        console.log(p_interval)
        this.interval = p_interval
    }

    /**
     * set the timer to start
     */
    this.start = () => {
        if (this.run === false) {
            this.run = true
            console.log("timer has been started")
            this.loop()
        } else {
            console.log("timer already started")
        }
    }
    /**
     * set the timer to stop
     */
    this.stop = () => {
        if (this.run === true) {
            this.run = false
            console.log("timer has been stopped")
        } else {
            console.log("timer already stopped")
        }
    }
    /**
     * to the loop and generate an event after it
     */
    this.loop = () => {
        setTimeout(() => {
            this.count += 10
            if (this.count % this.interval === 0) {
                callback(this.count)
                this.nextLoop()
            } else if (this.run === true) {
                this.nextLoop()
            }
        }, this.defaultInterval)
    }
    /**
     * setup the next loop
     */
    this.nextLoop = () => {
        if (this.run === true) {
            this.loop()
        }
    }

    /**
     * set the interval with a new interval -> will stop the timer
     * @param {p_interval} p_interval [new interval]
     */
    this.setInterval = (p_inputInterval) => {
        this.stop()
        this.interval = p_inputInterval
        this.stop()
    }

    /**
     * get interval with divers formats
     */
    this.getMilliSecond = () => {
        return this.count
    }
    this.getSecond = () => {
        return this.count / THOUSAND
    }
    this.getMinute = () => {
        return (this.count / THOUSAND) / SIXTY
    }
    this.getHours = () => {
        return ((this.count / THOUSAND) / SIXTY) / SIXTY
    }
    // get actual timer on different format
    this.getActualTimer = (p_format) => {
        switch(p_format) {
            case "UTC": {
                var milliseconds = String(this.count % 1000)
                var seconds = String((this.count / THOUSAND) % 60)
                var minutes = String((this.count / THOUSAND) / SIXTY % SIXTY)
                var hours = String(((this.count / THOUSAND) / SIXTY) / SIXTY % SIXTY)
                return hours.split('.')[0] + "h:" + minutes.split('.')[0] + "min:" + seconds.split('.')[0] + "s:" + milliseconds + "ms"
            }
            case "CH1": {
    
                return ""
            }
            default: {
                return "wrong parameter"
            }
        }
    }

    /**
     * delete this object
     */
    this.delete = () => {
        this.stop()
        //this = null
    }
    /**
     * clone this timer (don't create a reference)
     * @param {none}
     * @return {Timer} a temporal timer with this params
     */
    this.clone = (p_callback) => {
        var t_timer = new Timer(this.interval, p_callback)
        return t_timer
    }
}