import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import userModel from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please fill in all required fields.", 400));
  }

  const userExists = await userModel.findOne({ email });

  if (userExists) {
    return next(new ErrorHandler("Email already registered.", 400));
  }

  const user = await userModel.create({ email, password });

  if (!user) {
    return next(
      new ErrorHandler("Something went wrong. Please try again.", 500)
    );
  }

  res.status(201).json({
    success: true,
    message: "Registed successfully !",
    user,
  });
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please fill in all required fields.", 400));
  }

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid credentials email", 400));
  }

  const passwordMatched = await user.matchPassword(password);

  if (!passwordMatched) {
    return next(new ErrorHandler("Invalid credentials password", 400));
  }

  await sendToken(user, 200, res);
});
