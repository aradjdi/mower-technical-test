import {InputException} from './exceptions';
import {parseInput, parseLawn, parseMowers} from './parsers';

describe('Parser tests', () => {
	it('Should parse input correctly', () => {
		const lines = parseInput('./mock/input.valid.txt');
		const expectedLines = [
			'5 5',
			'1 2 N',
			'LFLFLFLFF',
			'3 3 E',
			'FFRFFRFRRF',
		];
		expect(lines).toStrictEqual(expectedLines);
	});

	it('Should parse lawn correctly', () => {
		const lawn = parseLawn('5 5');
		const expectedLawn = {x: 5, y: 5};

		expect(lawn).toStrictEqual(expectedLawn);
	});

	it('Should parse mowers correctly', () => {
		const lawn = {x: 5, y: 5};
		const mowersRaw = [
			'1 2 N',
			'LFLFLFLFF',
			'3 3 E',
			'FFRFFRFRRF',
		];
		const mowers = parseMowers(lawn, mowersRaw);
		const expectedMowers = [
			{x: 1, y: 2, direction: 'N', instructions: 'LFLFLFLFF'.split('')},
			{x: 3, y: 3, direction: 'E', instructions: 'FFRFFRFRRF'.split('')},
		];

		expect(mowers).toStrictEqual(expectedMowers);
	});
});

