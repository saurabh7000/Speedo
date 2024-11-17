import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import csv from "csvtojson";
import {
  getTripDetails,
  getTotalDistance,
  getStoppedDuration,
  getOverSpeedDuration,
  getOverSpeedDistance,
  getTotalTravelDuration,
} from "../utils/tripCalculation.js";
import tripsModel from "../models/tripsModel.js";

export const createTrip = catchAsyncErrors(async (req, res, next) => {
  const { tripName } = req.body;
  const userId = req.user._id;

  if (!tripName) {
    return next(new ErrorHandler("Please provide a trip name!", 400));
  }
  if (!req.file) {
    return next(new ErrorHandler("Please upload a file!", 400));
  }

  const result = await csv().fromFile(req.file.path);
  const tripData = [];
  tripData.push(...result);
  const tripDetail = getTripDetails(tripData);
  const distance = Math.ceil(getTotalDistance(tripDetail));
  const duration = Math.ceil(getTotalTravelDuration(tripDetail));
  const overSpeedDuration = Math.ceil(getOverSpeedDuration(tripDetail));
  const overSpeedDistance = Math.ceil(getOverSpeedDistance(tripDetail));
  const stoppedDuration = Math.ceil(getStoppedDuration(tripDetail));

  const savedTrip = await tripsModel.create({
    user: userId,
    tripName,
    tripDetail,
    distance: distance || 0,
    duration: duration || 0,
    overSpeedDistance: overSpeedDistance || 0,
    overSpeedDuration: overSpeedDuration || 0,
    stoppedDuration: stoppedDuration || 0,
  });

  return res.status(201).json({
    success: true,
    trip: savedTrip,
  });
});

export const getAllTrips = catchAsyncErrors(async (req, res, next) => {
  console.log(req.user);
  
  const userId = req.user._id;
  const totalTrips = await tripsModel.countDocuments({ user: userId });

  if (totalTrips === 0) {
    return next(new ErrorHandler("No trip found", 400));
  }

  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const startIndex = (page - 1) * limit;

  const trips = await tripsModel
    .find({ user: userId })
    .skip(startIndex)
    .limit(limit);

  res.status(200).json({
    success: true,
    totalTrips,
    trips,
  });
});

export const getSelectedTrips = catchAsyncErrors(async (req, res, next) => {
  const { tripsId } = req.body;
  const userId = req.user._id;

  if (!Array.isArray(tripsId) || tripsId.length === 0) {
    return next(new ErrorHandler("Please provide an array of trips", 400));
  }

  const trips = await tripsModel.find({ _id: { $in: tripsId }, user: userId });
  const totalTrips = trips.length;

  if (totalTrips === 0) {
    return next(new ErrorHandler("No trip found", 404));
  }

  res.status(200).json({
    success: true,
    totalTrips,
    trips,
  });
});

export const deleteTrips = catchAsyncErrors(async (req, res, next) => {
  const { tripsId } = req.body;
  const userId = req.user._id;

  if (!Array.isArray(tripsId) || tripsId.length === 0) {
    return next(new ErrorHandler("Please provide an array of trips", 400));
  }

  const deletedTrips = await tripsModel.deleteMany({
    _id: { $in: tripsId },
    user: userId,
  });

  if (deletedTrips.deletedCount === 0) {
    return next(new ErrorHandler("No trip found to delete", 400));
  }

  res.status(200).json({
    success: true,
    message: `${deletedTrips.deletedCount} trips deleted successfully.`,
  });
});
