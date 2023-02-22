let State = class {
	isReady;
	#readyHandlers = [];
	#waitHandlers = [];

	constructor(state) {
		let count;
		this.isReady = state === 'ready';

		// define 'status property' (enum: ready|wait)
		Object.defineProperty(this, 'status', {
			set: (value) => {
				if (["ready", 'wait'].includes(value)) {
					this[value]();
				} else {
					throw new Error("Wrong status: " + value);
				}
			},
			get: () => {
				return this.isReady ? 'ready' : 'wait';
			}
		});

		// define count property for ticker
		Object.defineProperty(this, 'count', {
			set: (value) => {
				count = value;
				if (value <= 0) {
					this.ready();
				} else {
					this.isReady = false;
				}
			},
			get: function () {
				return count;
			}
		});
	}

	/**
	 * @description Switches the status to "ready". All `onReady` handlers will be called
	 */
	ready() {
		this.isReady = true;
		console.log('count:', this.count);
		if (this.count > 0) {
			this.count = 0;						// will call count.set
		} else {
			this.#readyHandlers.forEach(handler => {
				handler();
			});
		}
	}

	/**
	 * @description Switches the status to "wait". All `onWait` handlers will be called
	 */
	wait() {
		this.isReady = false;
		this.#waitHandlers.forEach(handler => {
			handler();
		});
	}

	/**
	 * @description Accepts and saves the handler.
	 * 				At the moment when the status becomes "ready", all `onReady` handlers will be called.
	 * @param handler
	 */
	onReady(handler) {
		this.#readyHandlers.push(handler);
		if (this.isReady) {
			handler();
		}
	}

	/**
	 * @description Accepts and saves the handler.
	 * 				At the moment when the status becomes "wait", all `onWait` handlers will be called.
	 * @param handler
	 */
	onWait(handler) {
		this.#waitHandlers.push(handler);
		if (!this.isReady) {
			handler();
		}
	}

	/**
	 * @description Sets a counter that is decremented each time the tic() method is called.
	 * 				When the counter reaches zero, the status will switch to `ready` and all `onReady` handlers will be called
	 * @param count
	 */
	ticker(count) {
		this.count = count;
	}

	tic() {
		this.count--;
	}
};

export default State;
