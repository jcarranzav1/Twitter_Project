import http from './http';

export const getTweets = () => {
	return http.get('tweets').then((response) => response.data);
};

export const createTweets = (body) => {
	return http.post(`/tweets`, body).then((response) => response.data);
};
