import State from "../index.js";

test('Create state, add onReady handler and change status to Ready', () => {
	let mystate = new State();
	let result = '';
	mystate.onReady(() => {
		result +=1;
	});
	mystate.onReady(() => {
		result +=2;
	});
	mystate.onReady(() => {
		result +=3;
	});

	mystate.ready();
	expect(result).toBe("123");
});


test('Create state with ticker(3), add 2 onReady handlers, run tic 3 times', () => {
	let mystate = new State();
	let result = '';
	mystate.onReady(() => {
		result +=1;
	});
	mystate.onReady(() => {
		result +=2;
	});

	let count = 3;
	mystate.ticker(count);
	for (let i=count; i>0; i--) {
		mystate.tic();
	}

	expect(result).toBe("12");
});