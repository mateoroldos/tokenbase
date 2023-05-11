import type { Token } from './token-interface';

export interface Group {
	id: string;
	name: string;
	description?: string;
	parentGroup: string | undefined;
	tokens: Token[];
}
