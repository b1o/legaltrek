import { random } from 'underscore';
import { LoremIpsum } from 'lorem-ipsum';
import { randomDate } from 'src/app/helpers';

export interface TimeEntry {
	id?: string | number;
	description: string;
	hoursBillable: any;
	hoursWorked: any;
	workedOn: Date;
	price: number;
	currency: string;
	name: string;
	type: string;
}

export const currenyCodes = ['BGN', 'USD', 'EUR'];

export const timeEntryTypes = ['INVOICING', 'ACCOUNTING'];

const lorem = new LoremIpsum({
	sentencesPerParagraph: {
		max: 8,
		min: 4,
	},
	wordsPerSentence: {
		max: 16,
		min: 4,
	},
});

export const createTestTimeEntry = (): TimeEntry => {
	return {
		currency: currenyCodes[random(currenyCodes.length - 1)],
		description: lorem.generateSentences(random(2, 6)),
		hoursBillable: randomDate(new Date(2019, 1, 1), new Date(2020, 1, 1)),
		hoursWorked: randomDate(new Date(2019, 1, 1), new Date(2020, 1, 1)),
		name: lorem.generateWords(random(1, 7)),
		price: random(500),
		type: timeEntryTypes[random(timeEntryTypes.length - 1)],
		workedOn: randomDate(new Date(2019, 1, 1), new Date(2020, 1, 1)),
		id: Math.random(),
	};
};
