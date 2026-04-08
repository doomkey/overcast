export interface Field {
	value: string;
	visible: boolean;
	placeholder: string;
}

export interface CoverState {
	subtitle: Field;
	title: Field;
	course_code: Field;
	course_title: Field;
	submittedTo: Field;
	designation: Field;
	dept: Field;
	dept_bottom: Field;
	varsity: Field;
	varsity_bottom: Field;
	submittedBy: Field;
	studentId: Field;
	regNo: Field;
	session: Field;
	date: Field;
}

export interface SavedData {
	id?: string;
	subtitle: string[];
	title: string[];
	course_code: string[];
	course_title: string[];
	submittedTo: string[];
	designation: string[];
	dept: string[];
	dept_bottom: string[];
	varsity: string[];
	varsity_bottom: string[];
	submittedBy: string[];
	studentId: string[];
	regNo: string[];
	session: string[];
	date?: string[];
}
