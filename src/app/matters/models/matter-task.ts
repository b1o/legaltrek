import { LoremIpsum } from 'lorem-ipsum';
import { random, range } from 'underscore';
import { MatterTaskStatus } from './matter-task-status';
import { randomDate } from 'src/app/helpers';

export interface MatterTask {
	name?: string;
	matter?: any;
	client?: any;
	assignetTo?: any;
	descriptionEN?: string;
	descriptionBG?: string;
	status?: MatterTaskStatus;
	startDate?: Date;
	endDate?: Date;
	deliveryDate?: Date;
	documents?: any[];
	remindOn?: Date;
	remindTo?: any[];
	remindVIA?: any;
}

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

export const createTestTask = (): MatterTask => {
	return {
		name: lorem.generateWords(Math.floor(random(2, 7))),
		matter: lorem.generateWords(Math.floor(random(2, 5))),
		assignetTo: lorem.generateWords(2),
		client: lorem.generateWords(3),
		deliveryDate: randomDate(new Date(2019, 1, 1), new Date(2020, 1, 1)),
		descriptionBG: lorem.generateSentences(Math.floor(random(2, 6))),
		descriptionEN: lorem.generateSentences(Math.floor(random(2, 6))),
		documents: [],
		endDate: randomDate(new Date(2019, 1, 1), new Date(2020, 1, 1)),
		startDate: randomDate(new Date(2019, 1, 1), new Date(2020, 1, 1)),
		remindOn: randomDate(new Date(2019, 1, 1), new Date(2020, 1, 1)),
		remindTo: range(Math.floor(random(1, 5))).map((_) =>
			lorem.generateWords(2)
		),
		remindVIA: Math.floor(random(3)),
		status: Math.floor(random(2)),
	};
};
