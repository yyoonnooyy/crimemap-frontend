const REST_API_KEY = "68b9345cbe4eaf4b204cc04193c2f055";
const KAKAO_REDIRECT_URL = "http://localhost:3000/oauth";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=
${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;

const NAVER_CLIENT_ID = "6sA3tt42khJiE9H3xWmE";
const NAVER_CALLBACK_URL = "http://localhost:3000/oauth";
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type
=code&client_id=${NAVER_CLIENT_ID}&state=STATE_STRING&redirect_uri=${NAVER_CALLBACK_URL}`;