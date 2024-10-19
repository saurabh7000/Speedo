import { Router } from "express";
import {
  createTrip,
  deleteTrips,
  getAllTrips,
  getSelectedTrips,
} from "../controllers/tripController.js";
import upload from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/authenticate.js";

const router = Router();

router
  .route("/createtrip")
  .post(upload.single("file"), isAuthenticated, createTrip);
router.route("/alltrips").get(isAuthenticated, getAllTrips);
router.route("/trips/detail").post(isAuthenticated, getSelectedTrips);
router.route("/delete/trips").delete(isAuthenticated, deleteTrips);

export default router;
