export interface TaskDTO {
	matter_id: string;
	id: string;
	name: string;
	description: string;
	level: string;
	priority: string;
	start_date: string;
	end_date: string;
	delivery_date: string;
	client_type: string;
	client: string;
	color: string;
	assigned_to: Array<any>;
}
