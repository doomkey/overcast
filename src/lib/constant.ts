export const paperSizes = {
	a4: { label: 'A4', value: 'A4' },
	letter: { label: 'Letter', value: 'LETTER' },
	legal: { label: 'Legal', value: 'LEGAL' },
	a3: { label: 'A3', value: 'A3' }
} as const;
export type PaperSizeOption = (typeof paperSizes)[keyof typeof paperSizes];

export const workspaceBehaviors = {
	COPY: { label: 'Copy existing workspace', value: 'copy' },
	FRESH: { label: 'Start fresh', value: 'fresh' }
} as const;
export type WorkspaceBehaviorOption = (typeof workspaceBehaviors)[keyof typeof workspaceBehaviors];

export const margins = {
	narrow: { label: 'Narrow', value: [36, 36, 36, 36] as const }, // ~20mm
	normal: { label: 'Normal', value: [72, 72, 72, 72] as const }, // ~40mm
	wide: { label: 'Wide', value: [120, 120, 120, 120] as const }, // ~60mm
	custom: { label: 'Custom', value: [0, 0, 0, 0] as const }
} as const;
export type MarginOption = (typeof margins)[keyof typeof margins];

export const marginUnits = ['mm', 'inch'] as const;
export type MarginUnit = (typeof marginUnits)[number];

export type BrokenType = 'preview' | 'shared_preview' | 'both';

export type UnsupportedBrowser = {
	name: string;
	broken: BrokenType;
	minVersion?: string;
	customName?: string;
};

export const unsupportedBrowsers: UnsupportedBrowser[] = [
	{
		name: 'UCBrowser',
		broken: 'shared_preview'
	},
	{
		name: 'Facebook',
		broken: 'both'
	},
	{
		name: 'Mobile Chrome', //via browser,
		broken: 'both',
		minVersion: '130', // via says 116, so real chrome with 130 will probably be fine ig.
		customName: 'Via'
	},
	{
		name: 'Samsung Internet',
		broken: 'both'
	}
];
