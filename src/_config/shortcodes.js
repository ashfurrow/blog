import { DateTime } from "luxon";


function groupBy(collection, iteratee) {
  const result = {};  
  for (const item of collection) {
    const key = iteratee(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
}

export default function(eleventyConfig) {
	// Groups posts by month, with most recent months first and most recent posts within each month first.
	// We need to use a shortcode here because we need to access the `collections` object, but shortcodes can only return strings. So we need to use a fromJson filter in the template. (And the parseDate filter.)
	eleventyConfig.addShortcode("groupedPosts", function(one, two, three) {
		const collection = this.ctx.collections.posts;
		const posts = collection.map(p => ({ 
				title: p.data.title, 
				url: p.url,
				date: p.date,
			}));

		const postsByYear = groupBy(posts, (post) => {
			return new Date(post.date).getFullYear()
		})

		const results = Object.keys(postsByYear).map((year) => {
			const yearPosts = postsByYear[year]
			const postsByMonth = groupBy(yearPosts, (post) => {
				return new Date(post.date).toLocaleDateString('en-US', { 
					month: 'long', 
					year: 'numeric' 
				});
			})
			const months = Object.keys(postsByMonth).map((month) => {
				const monthPosts = postsByMonth[month];
				return {
					name: month,
					posts: monthPosts.sort((a, b) => {
						const dateA = new Date(a.date);
						const dateB = new Date(b.date);
						return dateA - dateB; // Most recent posts come first within month
					})
				}
			}).sort((a, b) => {
				const dateA = new Date(a.posts[0].date);
				const dateB = new Date(b.posts[0].date);
				return dateB - dateA; // Most recent months come first
			})
		
			return {
				year: parseInt(year, 10),
				months
			}
		})
		  .sort((lhs, rhs) => rhs.year - lhs.year)
			.flatMap(({months}) => months)

		return JSON.stringify(results);
  });

	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", target => {
		return Object.keys(target);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "posts"].indexOf(tag) === -1);
	});

	eleventyConfig.addFilter("sortAlphabetically", strings =>
		(strings || []).sort((b, a) => b.localeCompare(a))
	);
};
