import {Direction, Instruction, type Lawn, type Mower} from './models';
import {DirectionException, InstructionException} from '../utils/exceptions';

const directions = new Map<Direction, {left: Direction; right: Direction}>();
directions.set(Direction.North, {left: Direction.West, right: Direction.East});
directions.set(Direction.East, {left: Direction.North, right: Direction.South});
directions.set(Direction.South, {left: Direction.East, right: Direction.West});
directions.set(Direction.West, {left: Direction.South, right: Direction.North});

function getLeftDirection(mower: Mower) {
	const nextDirection = directions.get(mower.direction);
	if (!nextDirection) {
		throw new DirectionException(`Direction '${mower.direction}' does not exist`);
	}

	return nextDirection.left;
}

function getRightDirection(mower: Mower) {
	const nextDirection = directions.get(mower.direction);
	if (!nextDirection) {
		throw new DirectionException(`Direction '${mower.direction}' does not exist`);
	}

	return nextDirection.right;
}

function getNextPositionBuilder(maxTop: number, maxLeft: number) {
	return (mower: Mower) => {
		switch (mower.direction) {
			case Direction.North:
				return {x: mower.x, y: Math.min(maxTop, mower.y + 1)};
			case Direction.South:
				return {x: mower.x, y: Math.max(0, mower.y - 1)};
			case Direction.East:
				return {x: Math.min(maxLeft, mower.x + 1), y: mower.y};
			case Direction.West:
				return {x: Math.max(0, mower.x - 1), y: mower.y};

			default:
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				throw new DirectionException(`Direction '${mower.direction}' does not exist`);
		}
	};
}

function executeInstruction(maxTop: number, maxLeft: number) {
	const getNextPosition = getNextPositionBuilder(maxTop, maxLeft);

	return (mower: Mower, instruction: Instruction) => {
		switch (instruction) {
			case Instruction.Forward:
				mower = {...mower, ...getNextPosition(mower)};
				break;
			case Instruction.Right:
				mower = {...mower, direction: getRightDirection(mower)};
				break;
			case Instruction.Left:
				mower = {...mower, direction: getLeftDirection(mower)};
				break;
			default:
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				throw new InstructionException(`Instruction '${instruction}' does not exist`);
		}

		return mower;
	};
}

export function executeInstructions(lawn: Lawn, mowers: Mower[]) {
	return mowers.map(mower => mower.instructions.reduce(executeInstruction(lawn.y, lawn.x), mower));
}
