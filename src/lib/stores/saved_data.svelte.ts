import { templates, fonts } from '$lib/functions/pdfGenerator';
import { db } from '$lib/db';
import type { SavedData } from '$lib/types';

function createSavedData(): SavedData {
	return {
		title: [],
		dept: [],
		dept_bottom: [],
		designation: [],
		regNo: [],
		session: [],
		studentId: [],
		submittedBy: [],
		submittedTo: [],
		subtitle: [],
		varsity: [],
		varsity_bottom: [],
		date: []
	};
}
let dbId: number | undefined = undefined;

export const savedData: SavedData = $state(createSavedData());
export function initSavedDataSync() {
	$effect(() => {
		const snapshot = $state.snapshot(savedData);
		persistSavedData();
	});
}
export async function loadSavedData() {
	const all = await db.savedData.toArray();
	if (all.length > 0) {
		dbId = all[0].id;
		Object.assign(savedData, all[0]);
	} else {
		dbId = await db.savedData.add(createSavedData());
	}
}

export async function persistSavedData() {
	if (dbId === undefined) return;
	const plain = $state.snapshot(savedData);
	await db.savedData.update(dbId, plain);
}
export { createSavedData };
