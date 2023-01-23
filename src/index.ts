import {type Lawn, type Dimension, type Mower} from './utils/models';
import {executeInstructions} from './utils/mower';
import {parseLawn, parseInput, parseMowers} from './utils/parsers';

function main() {
	let lines: string[];
	try {
		console.log('Parsing input...');
		lines = parseInput('./input.txt');
		console.log('Parse succeed');
	} catch (e) {
		console.log('Parse failed');
		return;
	}

	let lawn: Lawn;
	try {
		console.log('Parsing lawn...');
		lawn = parseLawn(lines[0] as Dimension);
		console.log('Parse succeed');
	} catch (e) {
		console.log('Parse failed');
		return;
	}

	let mowers: Mower[];
	try {
		console.log('Parsing mowers...');
		mowers = parseMowers(lawn, lines.slice(1));
		console.log('Parse succeed');
	} catch (e) {
		console.log('Parse failed');
		return;
	}

	try {
		console.log('Running mowers...');
		const executionResult = executeInstructions(lawn, mowers);
		console.log('Run succeed');
		console.log('Result :', executionResult);
	} catch (e) {
		console.log('Run failed');
	}
}

main();
