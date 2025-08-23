// export const BASE_URL = "/api"
//export const FRONT_URL = "http://localhost:5173"
export const FRONT_URL = location.hostname === "localhost"? "http://localhost:5173": "https://pusle-match.onrender.com";

export const BASE_URL = location.hostname === "localhost"? "http://localhost:3000": "https://tinderinspired-2.onrender.com";
