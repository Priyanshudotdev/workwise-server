import mongoose from "mongoose";
import type VerficationCodeType from "../config/verification-code-types";

export interface VerificationDocument extends mongoose.Document {
	userId: mongoose.Types.ObjectId;
	type: VerficationCodeType;
	expiresAt: Date;
	createdAt: Date;
}

const verificationCodeSchema = new mongoose.Schema<VerificationDocument>({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
		index: true,
	},
	type: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
	expiresAt: {
		type: Date,
		required: true,
	},
});

const VerificationCodeModel = mongoose.model<VerificationDocument>(
	"VerficationCode",
	verificationCodeSchema,
	"verification_codes"
);

export default VerificationCodeModel;
