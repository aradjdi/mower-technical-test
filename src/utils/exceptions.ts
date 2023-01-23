export class InputException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InputException';
	}
}

export class LawnException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'LawnException';
	}
}

export class MowerException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'MowerException';
	}
}

export class PositionException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'PositionException';
	}
}

export class DirectionException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'DirectionException';
	}
}

export class InstructionException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InstructionException';
	}
}
