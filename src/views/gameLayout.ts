export const GAME_VIEW_LAYOUT = {
	landscape: {
		headsBtn: { x: 384, y: 540 },
		tailsBtn: { x: 1536, y: 540 },
		coin: { x: 960, y: 540 },
		modal: { x: 960, y: 840 },
	},

	portrait: {
		coin: { x: 540, y: 640 },
		headsBtn: { x: 270, y: 1280 },
		tailsBtn: { x: 810, y: 1280 },
		modal: { x: 540, y: 1580 },
	},
} as const;
