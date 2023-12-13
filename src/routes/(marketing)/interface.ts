export interface Post{
	title: string;
	date: string;
	updated: string;
	categories: string[];
	coverImage: string;
	coverWidth: number;
	coverHeight: number;
	excerpt: string;
    slug: string | undefined;
}

export interface Variable {
    text: string;
    color: string;
    description: string;
}