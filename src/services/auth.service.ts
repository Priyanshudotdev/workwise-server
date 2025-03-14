import jwt from "jsonwebtoken";
import env from "../config/env-config";
import SessionModel from "../models/session.model";
import UserModel from "../models/user.model";

export type CreateAccountType = {
	email: string;
	password: string;
	userAgent?: string;
};

export const createAccount = async (data: CreateAccountType) => {
	// Verify existing user doesn't exists for the given credentials

	const existingUser = await UserModel.exists({
		email: data.email,
	});

	if (existingUser) {
		throw new Error("User already exists");
	}

	// Create User

	const user = await UserModel.create({
		email: data.email,
		password: data.password,
	});

	// Generate Verfication Code
	// const verificationCode = await VerificationCodeModel.create({
	// 	userId: user._id,
	// 	type: VerficationCodeType.EmailVerification,
	// 	expiresAt: oneYearForNow().toUTCString(),
	// });

	// Send Verfication Code via Email

	//TODO:

	// Create Session
	const session = await SessionModel.create({
		userId: user._id,
		userAgent: data.userAgent,
	});

	// Sign Access and Refresh Token
	const refreshToken = jwt.sign(
		{ sessionId: session._id },
		env.JWT_REFRESH_SECRET,
		{
			audience: ["user"],
			expiresIn: "30d",
		}
	);

	const accessToken = jwt.sign(
		{ userId: user._id, sessionId: session._id },
		env.JWT_SECRET,
		{
			audience: ["user"],
			expiresIn: "15m",
		}
	);

	// return user & tokens

	return {
		user,
		accessToken,
		refreshToken,
	};
};
