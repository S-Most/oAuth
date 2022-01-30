import { parse } from 'cookie';
export async function handle({ event, resolve }) {
	let parsed = parse(event.request.headers.get('cookie'));

	const cookies = { user: parsed.user ?? '' };
	event.locals.user = cookies.user;

	const response = await resolve(event);

	response.headers.set('set-cookie', `user=${event.locals.user ?? ''}; path=/; HttpOnly`);

	return response;
}

export async function getSession(event) {
	return {
		user: event.locals.user
	};
}
