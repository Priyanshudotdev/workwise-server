import type AppErrorCode from "../config/app-error-code";
import type { HttpStatusCodeType } from "../config/http-status-code";

class AppError extends Error {
	constructor(
		public statusCode: HttpStatusCodeType,
		public message: string,
		public errorCode?: AppErrorCode
	) {
		super(message);
	}
}

// const app = new AppError(
// 	{
// 		OK,
// 	},
// 	"MSG",
// 	"INVALIDACCESSTOKEN"
// );

export default AppError;
