export enum Direction {
	North = 'N',
	South = 'S',
	East = 'E',
	West = 'W',
}

export enum Instruction {
	Right = 'R',
	Left = 'L',
	Forward = 'F',
}

export type Dimension = `${number} ${number}`;

export type Position = `${Dimension} ${Direction}`;

export type Mower = {
	x: number;
	y: number;
	direction: Direction;
  instructions: Instruction[];
};

export type Lawn = {
	x: number;
	y: number;
};
