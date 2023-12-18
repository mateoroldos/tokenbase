/**
 * All of these values are used throughout the site – for example,
 * in the <meta> tags, in the footer, and in the RSS feed.
 *
 * PLEASE BE SURE TO UPDATE THEM ALL! Thank you!
 **/

export const siteTitle = 'Tokenbase Blog'
export const siteDescription =
	'Sharing knowledge about design systems and design operations'
export const siteURL = 'blog.tokenbase.gg'
export const siteLink = 'https://github.com/emestudio/tokenbase-blog'
export const siteAuthor = 'Tokenbase'

// Controls how many posts are shown per page on the main blog index pages
export const postsPerPage = 9
// Edit this to alter the main nav menu. (Also used by the footer and mobile nav.)
export const navItems = [
	{
		title: 'Blog',
		route: '/articles'
	},
	{
		title: 'About',
		route: '/about'
	}
]
