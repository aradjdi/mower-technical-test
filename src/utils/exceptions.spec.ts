import {InputException, LawnException, MowerException} from './exceptions';
import {type Dimension} from './models';
import {parseInput, parseLawn, parseMowers} from './parsers';

describe('Parser tests', () => {
	it('Should throw LawnException with empty lawn', () => {
		const invalidCaller = () => {
			const lines = parseInput('./mock/input.invalid.empty-dimension.txt');
			parseLawn(lines[0] as Dimension);
		};

		expect(invalidCaller).toThrow(LawnException);
	});

	it('Should throw MowerException with incorrect instructions command', () => {
		const invalidCaller = () => {
			const lines = parseInput('./mock/input.invalid.instruction.txt');
			const lawn = parseLawn(lines[0] as Dimension);
			parseMowers(lawn, lines.slice(1));
		};

		expect(invalidCaller).toThrow(MowerException);
	});

	it('Should throw InputException with incorrect line length', () => {
		const invalidCaller = () => {
			parseInput('./mock/input.invalid.length.txt');
		};

		expect(invalidCaller).toThrow(InputException);
	});

	it('Should throw LawnException with incorrect file format', () => {
		const invalidCaller = () => {
			const lines = parseInput('./mock/input.invalid.negativ-dimension.txt');
			parseLawn(lines[0] as Dimension);
		};

		expect(invalidCaller).toThrow(LawnException);
	});

	it('Should throw MowerException with incorrect file format', () => {
		const invalidCaller = () => {
			const lines = parseInput('./mock/input.invalid.position.txt');
			const lawn = parseLawn(lines[0] as Dimension);
			parseMowers(lawn, lines.slice(1));
		};

		expect(invalidCaller).toThrow(MowerException);
	});
});

