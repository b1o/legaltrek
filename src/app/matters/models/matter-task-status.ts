export enum MatterTaskStatus {
	PENDING,
	IN_PROGRESS,
	DONE,
}

export const MatterTaskLabelMap = {
	'Свършено': MatterTaskStatus.DONE,
	'В процес': MatterTaskStatus.IN_PROGRESS
}