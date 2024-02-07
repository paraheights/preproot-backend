import mongoose, { Document } from "mongoose";

interface UserDocument extends Document {
  name: string;
  role: string;
  email?: string;
  mobile: string;
  avatar?: string;
  gender?: string;
  dateOfBirth?: string;
  previousEmails: string[];
  previousMobiles: string[];
  active: boolean;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: { type: String, trim: true, default: null },
    role: {
      type: String,
      enum: ["USER", "LEAD", "ENQUIRY", "STUDENT"],
      default: "USER",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Not a valid email address",
      ],
      default: null,
    },
    mobile: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      sparse: true,
      match: [
        /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/,
        `Not a valid phone number!`,
      ],
    },
    avatar: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "UNSPECIFIED", "OTHER"],
      trim: true,
    },
    dateOfBirth: { type: Date, default: null },
    previousEmails: [mongoose.Schema.Types.String],
    previousMobiles: [mongoose.Schema.Types.String],
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model<UserDocument>("User", userSchema);

export { userModel };
