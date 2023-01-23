import {readFileSync} from 'fs';
import {type Dimension, type Position, type Direction, type Instruction, type Lawn} from './models';
import {InputException, LawnException, MowerException} from './exceptions';

export function parseInput(path: string) {
	const lines = readFileSync(path, {encoding: 'utf8'}).trim().split('\n').filter(Boolean);

	if (!lines.length || lines.length % 2 !== 1) {
		throw new InputException(`Something wrong with input file, number of line is null or incoherent, length equals '${lines.length}`);
	}

	return lines;
}

export function parseLawn(lawnDimension: Dimension) {
	const lawnRegex = /^(?<x>\d+)\s(?<y>\d+)$/;

	const match = lawnRegex.exec(lawnDimension);

	if (!match?.groups) {
		throw new LawnException(`Lawn dimension '${lawnDimension}' malformatted`);
	}

	const x = parseInt(match.groups.x, 10);
	const y = parseInt(match.groups.y, 10);

	if (x <= 0 || y <= 0) {
		throw new LawnException(`Cannot initiate an empty lawn or a lawn with negative dimension, trying to initiate with ('${x}, ${y}')`);
	}

	return {x, y};
}

function parseInstruction(instructions: string) {
	const instructionsRegex = /^[RLF]+$/;

	const match = instructionsRegex.exec(instructions);

	if (!match) {
		throw new MowerException(`Mower instructions '${instructions}' malformatted`);
	}

	return instructions.replace(/R{4}|L{4}|RL|LR/g, '').split('') as Instruction[];
}

function parsePositionBuilder(maxTop: number, maxLeft: number) {
	return (position: Position) => {
		const positionRegex = /^(?<x>\d+)\s(?<y>\d+)\s(?<direction>[NSEW])$/;

		const match = positionRegex.exec(position);

		if (!match?.groups) {
			throw new MowerException(`Mower position '${position}' malformatted`);
		}

		const x = parseInt(match.groups.x, 10);
		const y = parseInt(match.groups.y, 10);

		if (x > maxLeft || x <= 0) {
			throw new MowerException(`Cannot initiate mower outside of lawn boundaries, trying to place at '${x}' on left where mas left max dimension is ${maxLeft}'`);
		}

		if (y > maxTop || y <= 0) {
			throw new MowerException(`Cannot initiate mower outside of lawn boundaries, trying to place at '${y}' on top where mas top max dimension is ${maxTop}'`);
		}

		if (!['N', 'E', 'S', 'W'].includes(match.groups.direction)) {
			throw new MowerException(`Cannot initiate mower direction, direction '${match.groups.direction}' does not exist`);
		}

		return {x, y, direction: match.groups.direction as Direction};
	};
}

function parseMowerBuilder(maxTop: number, maxLeft: number) {
	const parsePosition = parsePositionBuilder(maxTop, maxLeft);

	return ([position, command]: [Position, string]) => {
		const {x, y, direction} = parsePosition(position);

		const instructions = parseInstruction(command);

		return {x, y, direction, instructions};
	};
}

export function parseMowers(lawn: Lawn, lines: string[]) {
	const parseMower = parseMowerBuilder(lawn.y, lawn.x);

	const mowers: Array<[Position, string]> = [];
	while (lines.length) {
		const mower = lines.splice(0, 2) as [Position, string];
		mowers.push(mower);
	}

	return mowers.map(mower => parseMower(mower));
}
