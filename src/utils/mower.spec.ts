import {type Mower} from './models';
import {executeInstructions} from './mower';

const lawn = {
	x: 5,
	y: 5,
};

const mowers = [
	{x: 1, y: 2, direction: 'N', instructions: 'LFLFLFLFF'.split('')},
	{x: 3, y: 3, direction: 'E', instructions: 'FFRFFRFRRF'.split('')},
] as Mower[];

describe('Mover tests', () => {
	it('Should execute instruction correctly', () => {
		const result = executeInstructions(lawn, mowers);
		const expected = [
			{x: 1, y: 3, direction: 'N', instructions: 'LFLFLFLFF'.split('')},
	    {x: 5, y: 1, direction: 'E', instructions: 'FFRFFRFRRF'.split('')},
		];
		expect(result).toStrictEqual(expected);
	});
});

