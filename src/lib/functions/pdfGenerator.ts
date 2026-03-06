import { jsPDF } from 'jspdf';
import type { CoverState } from './types';

export function createPDFDocument(state: CoverState) {
	const doc = new jsPDF();
	const pageWidth = doc.internal.pageSize.getWidth();
	const centerX = pageWidth / 2;

	const getVal = (field: { value: string; placeholder: string }) =>
		field.value.trim() !== '' ? field.value : field.placeholder;

	doc.setLineWidth(0.5);
	doc.line(20, 45, pageWidth - 20, 45);
	doc.line(20, 65, pageWidth - 20, 65);

	if (state.subtitle.visible) {
		doc.setFont('times', 'bold').setFontSize(12);
		doc.text(getVal(state.subtitle), centerX, 40, { align: 'center' });
	}

	if (state.title.visible) {
		doc.setFont('times', 'bold').setFontSize(18);
		doc.text(getVal(state.title), centerX, 55, { align: 'center' });
	}

	const showTo =
		state.submittedTo.visible ||
		state.designation.visible ||
		state.dept.visible ||
		state.varsity.visible;

	if (showTo) {
		doc.setFont('times', 'bold').setFontSize(12);
		doc.text('Submitted to:', centerX, 110, { align: 'center' });

		doc.setFont('times', 'normal');
		let y = 118;
		const fieldsTo: (keyof CoverState)[] = ['submittedTo', 'designation', 'dept', 'varsity'];

		fieldsTo.forEach((key) => {
			if (state[key].visible) {
				doc.text(getVal(state[key]), centerX, y, { align: 'center' });
				y += 7;
			}
		});
	}

	const showBy = state.submittedBy.visible || state.studentId.visible || state.regNo.visible;

	if (showBy) {
		doc.setFont('times', 'bold');
		doc.text('Submitted by:', centerX, 165, { align: 'center' });

		doc.setFont('times', 'normal');
		const labelX = centerX - 25;
		const valueX = centerX - 5;
		let y = 175;

		if (state.submittedBy.visible) {
			doc.text('Name', labelX, y);
			doc.text(`: ${getVal(state.submittedBy)}`, valueX, y);
			y += 7;
		}
		if (state.studentId.visible) {
			doc.text('ID', labelX, y);
			doc.text(`: ${getVal(state.studentId)}`, valueX, y);
			y += 7;
		}
		if (state.regNo.visible) {
			doc.text('Reg. No', labelX, y);
			doc.text(`: ${getVal(state.regNo)}`, valueX, y);
		}
	}

	if (state.date.visible) {
		doc.setFont('times', 'normal').setFontSize(12);
		const dateText = state.date.value ? state.date.value : '_____________________';
		doc.text(`Submission date: ${dateText}`, centerX, 220, { align: 'center' });
	}

	doc.setFont('times', 'normal').setFontSize(11);
	doc.text(getVal(state.dept), centerX, 275, { align: 'center' });

	doc.setFont('times', 'bold').setFontSize(14);
	doc.text(getVal(state.varsity), centerX, 282, { align: 'center' });

	return doc;
}
