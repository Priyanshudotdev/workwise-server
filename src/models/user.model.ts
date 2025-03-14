import mongoose from "mongoose";
import { compareValue, hashvalue } from "../utils/bcrypt";

export interface UserSchema extends mongoose.Document {
	email: string;
	password: string;
	verified: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserSchema>(
	{
		email: {
			type: String,
			unique: true,
			trim: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		verified: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}

	this.password = await hashvalue(this.password);
	next();
});

userSchema.methods.comparePassword = async function (value: string) {
	//                          Hashed Password
	return compareValue(value, this.password);
};

const UserModel = mongoose.model<UserSchema>("User", userSchema);

export default UserModel;
