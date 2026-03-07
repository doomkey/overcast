import pdfMake from 'pdfmake/build/pdfmake';
import * as vfs from '$lib/assets/fonts/vfs_fonts';
import type { CoverState } from '$lib/types';

(pdfMake as any).vfs = vfs;

pdfMake.addFonts({
	Tinos: {
		normal: 'Tinos-Regular.ttf',
		bold: 'Tinos-Bold.ttf',
		italics: 'Tinos-Italic.ttf',
		bolditalics: 'Tinos-BoldItalic.ttf'
	}
});
export function createPDFDocument(state: CoverState) {
	const getVal = (field: { value: string; placeholder: string }) =>
		field.value.trim() !== '' ? field.value : field.placeholder;

	const pt = (mm: number) => mm * 2.83465;
	const ptY = (mm: number, fontSize: number = 12) => pt(mm - fontSize * 0.25);

	const content: any[] = [];

	content.push({
		margin: [pt(20), pt(45), pt(20), 0],
		stack: [
			{
				canvas: [{ type: 'line', x1: 0, y1: 0, x2: pt(170), y2: 0, lineWidth: 0.5 }]
			},
			state.subtitle.visible
				? {
						text: getVal(state.subtitle),
						bold: true,
						fontSize: 12,
						alignment: 'center',
						margin: [0, pt(-10), 0, pt(5)]
					}
				: null,
			state.title.visible
				? {
						text: getVal(state.title),
						bold: true,
						fontSize: 18,
						alignment: 'center',
						margin: [0, pt(5), 0, pt(5)]
					}
				: null,
			{
				canvas: [{ type: 'line', x1: 0, y1: 0, x2: pt(170), y2: 0, lineWidth: 0.5 }]
			}
		].filter(Boolean)
	});

	const showTo = [state.submittedTo, state.designation, state.dept, state.varsity].some(
		(f) => f.visible
	);
	if (showTo) {
		content.push({
			stack: [
				{ text: 'Submitted to:', bold: true, margin: [0, 0, 0, 8] },
				state.submittedTo.visible ? { text: getVal(state.submittedTo) } : null,
				state.designation.visible ? { text: getVal(state.designation) } : null,
				state.dept.visible ? { text: getVal(state.dept) } : null,
				state.varsity.visible ? { text: getVal(state.varsity) } : null
			].filter(Boolean),
			alignment: 'center',
			margin: [0, pt(40), 0, 0]
		});
	}

	const showBy = [state.submittedBy, state.studentId, state.regNo, state.session].some(
		(f) => f.visible
	);

	if (showBy) {
		const tableRows = [];

		const addRow = (label: string, value: string) => {
			tableRows.push([
				{ text: label, noWrap: true },
				{ text: ':', noWrap: true },
				{ text: value, noWrap: true }
			]);
		};

		if (state.submittedBy.visible) addRow('Name', getVal(state.submittedBy));
		if (state.studentId.visible) addRow('ID', getVal(state.studentId));
		if (state.regNo.visible) addRow('Reg. No', getVal(state.regNo));
		if (state.session.visible) addRow('Session', getVal(state.session));

		content.push({
			margin: [0, pt(25), 0, 0],
			stack: [
				{
					text: 'Submitted by:',
					bold: true,
					margin: [0, 0, 0, 8],
					alignment: 'center'
				},
				{
					table: {
						widths: ['*', 'auto', '*'],
						body: [
							[
								'',
								{
									table: {
										widths: [pt(20), 1, 'auto'],
										body: tableRows
									},
									layout: 'noBorders'
								},
								''
							]
						]
					},
					layout: 'noBorders'
				}
			]
		});
	}

	if (state.date.visible) {
		content.push({
			text: `Submission date: ${state.date.value || '_____________________'}`,
			alignment: 'center',
			absolutePosition: { x: 0, y: ptY(250, 12) }
		});
	}

	if (state.dept_bottom.visible) {
		content.push({
			text: getVal(state.dept_bottom),
			alignment: 'center',
			absolutePosition: { x: 0, y: ptY(275, 12) }
		});
	}

	if (state.varsity_bottom.visible) {
		content.push({
			text: getVal(state.varsity_bottom),
			bold: true,
			fontSize: 16,
			alignment: 'center',
			absolutePosition: { x: 0, y: ptY(282, 16) }
		});
	}

	const docDefinition = {
		pageSize: 'A4',
		pageMargins: [0, 0, 0, 0],
		defaultStyle: {
			font: 'Tinos',
			fontSize: 12
		},
		content
	};

	return pdfMake.createPdf(docDefinition as any);
}
