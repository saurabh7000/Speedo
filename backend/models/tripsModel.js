import { model, Schema } from "mongoose";

const tripSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  tripName: {
    type: String,
    required: true,
  },
  tripDetail: [
    {
      coordinate: [
        {
          latitudeA: {
            type: Number,
            required: true,
          },
          longitudeA: {
            type: Number,
            required: true,
          },
          latitudeB: {
            type: Number,
            required: true,
          },
          longitudeB: {
            type: Number,
            required: true,
          },
        },
      ],
      timestamp: {
        type: String,
        required: true,
      },
      ignition: {
        type: String,
        required: true,
      },
      distance: {
        type: Number,
        default: 0,
      },
      speed: {
        type: Number,
        default: 0,
      },
      isIdle: {
        type: Boolean,
        default: false,
      },
      isStopped: {
        type: Boolean,
        default: false,
      },
      isOverSpeed: {
        type: Boolean,
        default: false,
      },
      idleStoppedDuration: {
        type: Number,
        required: true,
      },
    },
  ],
  distance: {
    type: Number,
    required: true,
    default: 0,
  },
  duration: {
    type: Number,
    required: true,
    default: 0,
  },
  overSpeedDistance: {
    type: Number,
    required: true,
    default: 0,
  },
  overSpeedDuration: {
    type: Number,
    required: true,
    default: 0,
  },
  stoppedDuration: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default model("Trip", tripSchema);
