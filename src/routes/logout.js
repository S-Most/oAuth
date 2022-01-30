export async function get(event) {
	event.locals.user = null;

	return {
		status: 302,
		headers: {
			location: '/'
		}
	};
}
