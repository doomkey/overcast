export interface Field {
	value: string;
	visible: boolean;
	placeholder: string;
}

export interface CoverState {
	subtitle: Field;
	title: Field;
	submittedTo: Field;
	designation: Field;
	dept: Field;
	varsity: Field;
	submittedBy: Field;
	studentId: Field;
	regNo: Field;
	date: Field;
}
