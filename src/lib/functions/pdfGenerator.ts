import { registerTemplate, generatePdf } from '$lib/functions/pdfEngine';
import { hotashaCoverTemplate } from '$lib/templates/hotasha';
import { omanishaCoverTemplate } from '$lib/templates/omanisha';
import type { CoverState } from '$lib/types';

export const templates = {
	OMANISHA: 'OMANISHA',
	HOTASHA: 'HOTASHA'
};
export const fonts = {
	TINOS: {
		name: 'Tinos (Times New Roman)',
		value: 'TINOS'
	},
	ROBOTO: {
		name: 'Roboto',
		value: 'ROBOTO'
	},
	EB_GARAMOND: {
		name: 'EB Garamond',
		value: 'EBGARAMOND'
	},
	JETBRAINSMONO: {
		name: 'JetBrains Mono',
		value: 'JETBRAINSMONO'
	}
};
registerTemplate(templates.OMANISHA, omanishaCoverTemplate);
registerTemplate(templates.HOTASHA, hotashaCoverTemplate);

export function createPDFDocument(
	template = templates.OMANISHA,
	state: CoverState,
	font = fonts.ROBOTO.value
) {
	return generatePdf(template, state, font);
}
