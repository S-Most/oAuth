import fetch from 'node-fetch';

const tokenURL = 'https://github.com/login/oauth/access_token';
const userURL = 'https://api.github.com/user';

const clientId = import.meta.env.VITE_CLIENT_ID;
const secret = import.meta.env.VITE_CLIENT_SECRET;

export async function get({ url, locals }) {
	const code = url.searchParams.code;
	const token = await getToken(code);
	const user = await getUser(token);
	locals.user = user.login;
	return {
		status: 302,
		headers: {
			location: '/'
		}
	};
}

const getToken = async (code) => {
	return fetch(tokenURL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			client_id: clientId,
			client_secret: secret,
			code
		})
	})
		.then((res) => res.json())
		.then((res) => res.access_token);
};

const getUser = async (token) => {
	return fetch(userURL, {
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		}
	}).then((res) => res.json());
};
