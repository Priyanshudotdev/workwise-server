import type { CookieOptions, Response } from "express";
import { fifthenMinutesFromNow, thirtyDaysFromNow } from "./date";

const secure = process.env.NODE_ENV !== "development";

// const defaults: CookieOptions = {
// 	sameSite: "strict",
// 	httpOnly: true,
// 	secure,
// };

// const getAccessTokenCookieOptions = (): CookieOptions => ({
// 	...defaults,
// 	maxAge: fifthenMinutesFromNow().getMilliseconds(),
// }); // expires: fifthenMinutesFromNow() || undefined

// const getRefreshTokenCookieOptions = (): CookieOptions => ({
// 	...defaults,
// 	maxAge: thirtyDaysFromNow().getMilliseconds(),
// 	// expires: thirtyDaysFromNow() || undefined,
// 	path: "/auth/refresh",
// });

type Params = {
	res: Response;
	accessToken: string;
	refreshToken: string;
};

export const setAuthCookie = ({ res, accessToken, refreshToken }: Params) => {
	return res
		.cookie("accessToken", accessToken, {
			sameSite: "strict",
			httpOnly: true,
			secure,
			maxAge: fifthenMinutesFromNow().getMilliseconds(),
		})
		.cookie("refreshToken", refreshToken, {
			sameSite: "strict",
			httpOnly: true,
			secure,
			maxAge: thirtyDaysFromNow().getMilliseconds(),
			path: "/auth/refresh",
		});
};
