import Dexie, { type EntityTable } from 'dexie';
import type { SavedData } from '$lib/types';
import {
	type MarginOption,
	type MarginUnit,
	type PaperSizeOption,
	type WorkspaceBehaviorOption
} from '$lib/constant';

export type Settings = {
	paperSize: PaperSizeOption['value'];
	newWorkspaceBehavior: WorkspaceBehaviorOption['value'];
	marginLabel: MarginOption['label'];
	marginValue: MarginOption['value'];
	marginUnit: MarginUnit;
};
export type Setting = {
	key: string;
	value: unknown;
};
export class OvercastDB extends Dexie {
	savedData!: EntityTable<SavedData, 'id'>;
	settings!: EntityTable<Setting, 'key'>;
	constructor() {
		super('overcast');

		this.version(1).stores({
			savedData: '++id',
			settings: 'key'
		});
	}
}

export const db = new OvercastDB();

// usage
// // set
//await db.settings.put({ key: 'theme', value: 'dark' });

// get
//const theme = await db.settings.get('theme');
