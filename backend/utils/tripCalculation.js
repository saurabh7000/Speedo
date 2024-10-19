import { convertDistance, convertSpeed, getDistance, getSpeed } from "geolib";

export const convertToUnixTimeInMilliseconds = (dateString) => {
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("-").map(Number);
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  const date = new Date(year + 2000, month - 1, day, hours, minutes, seconds);

  const unixTimeInMilliseconds = date.getTime();

  return unixTimeInMilliseconds;
};

const speedBWTTwoPoints = (pointA, pointB) => {
  let speed = getSpeed(
    {
      latitude: parseFloat(pointA.latitude),
      longitude: parseFloat(pointA.longitude),
      time: convertToUnixTimeInMilliseconds(pointA.timestamp),
    },
    {
      latitude: parseFloat(pointB.latitude),
      longitude: parseFloat(pointB.longitude),
      time: convertToUnixTimeInMilliseconds(pointB.timestamp),
    }
  );

  let s = convertSpeed(speed, "kmh");
  if (s === Infinity || isNaN(s)) {
    s = 0;
  }

  return s;
};

const distanceOfTwoPoints = (pointA, pointB) => {
  const latitudeA = Number(pointA.latitude);
  const longitudeA = Number(pointA.longitude);
  const latitudeB = Number(pointB.latitude);
  const longitudeB = Number(pointB.longitude);

  let distance = getDistance(
    { latitude: latitudeA, longitude: longitudeA },
    { latitude: latitudeB, longitude: longitudeB }
  );

  if (isNaN(distance)) {
    distance = 20;
  }

  return convertDistance(distance, "km");
};

const getTimeDifference = (timeA, timeB) => {
  const dateA = new Date(timeA);
  const dateB = new Date(timeB);
  const difference = (dateB - dateA) / 1000 / 60;
  return difference;
};

export const getTripDetails = (tripData) => {
  const data = [];
  let firstOccurrence = null;

  for (let i = 1; i < tripData.length; i++) {
    const tripDetails = tripData[i];
    const prevTripDetail = tripData[i - 1];

    if (
      tripDetails.latitude === prevTripDetail.latitude &&
      tripDetails.longitude === prevTripDetail.longitude
    ) {
      if (firstOccurrence === null) firstOccurrence = prevTripDetail;
    } else if (firstOccurrence == null) {
      const timeDifference = getTimeDifference(
        prevTripDetail.timestamp,
        tripDetails.timestamp
      );
      const coordinate = [
        {
          latitudeA: parseFloat(tripDetails.latitude),
          longitudeA: parseFloat(tripDetails.longitude),
          latitudeB: parseFloat(prevTripDetail.latitude),
          longitudeB: parseFloat(prevTripDetail.longitude),
        },
      ];
      data.push({
        coordinate,
        timestamp: tripDetails.timestamp,
        ignition: tripDetails.ignition,
        distance: distanceOfTwoPoints(prevTripDetail, tripDetails),
        speed: speedBWTTwoPoints(prevTripDetail, tripDetails),
        isIdle: distanceOfTwoPoints(prevTripDetail, tripDetails) === 0,
        isStopped: tripDetails.ignition === "off",
        isOverSpeed: speedBWTTwoPoints(tripDetails, prevTripDetail) >= 60,
        idleStoppedDuration: timeDifference,
      });
    } else {
      const timeDifference = getTimeDifference(
        firstOccurrence.timestamp,
        tripDetails.timestamp
      );

      const coordinate = [
        {
          latitudeA: parseFloat(tripDetails.latitude),
          longitudeA: parseFloat(tripDetails.longitude),
          latitudeB: parseFloat(firstOccurrence.latitude),
          longitudeB: parseFloat(firstOccurrence.longitude),
        },
      ];

      data.push({
        coordinate,
        timestamp: tripDetails.timestamp,
        ignition: tripDetails.ignition,
        distance: distanceOfTwoPoints(firstOccurrence, tripDetails),
        speed: speedBWTTwoPoints(firstOccurrence, tripDetails),
        isIdle: true,
        isStopped: firstOccurrence.ignition === "off",
        isOverSpeed: speedBWTTwoPoints(firstOccurrence, tripDetails) > 60,
        idleStoppedDuration: timeDifference,
      });

      firstOccurrence = null;
    }
  }
  return data;
};

export const getTotalDistance = (tripDetail) => {
  let totalDistance = 0;

  for (let i = 0; i < tripDetail.length; i++) {
    const current = tripDetail[i];

    totalDistance += current.distance;
  }

  return Math.ceil(totalDistance);
};

export const getTotalTravelDuration = (tripDetail) => {
  let totalDuration = 0;

  for (let i = 1; i < tripDetail.length; i++) {
    const current = tripDetail[i];
    const previous = tripDetail[i - 1];

    if (current.ignition === "on" && previous.ignition === "on") {
      const currentTimestamp = new Date(current.timestamp).getTime();
      const previousTimestamp = new Date(previous.timestamp).getTime();

      totalDuration += currentTimestamp - previousTimestamp;
    }
  }

  return Math.ceil(totalDuration / 60000);
};

export const getStoppedDuration = (tripDetail) => {
  let time = 0;
  let lastOffTimestamp = 0;

  for (let i = 0; i < tripDetail.length; i++) {
    const currentTimestamp = convertToUnixTimeInMilliseconds(
      tripDetail[i].timestamp
    );

    if (tripDetail[i].ignition.toLowerCase() === "off") {
      if (lastOffTimestamp === 0) {
        lastOffTimestamp = currentTimestamp;
      }
    } else {
      if (lastOffTimestamp !== 0) {
        time += currentTimestamp - lastOffTimestamp;
        lastOffTimestamp = 0;
      }
    }
  }

  return Number(time / 60000);
};

export const getOverSpeedDuration = (tripDetail) => {
  let time = 0;
  let lastTimestamp = 0;

  for (let i = 0; i < tripDetail.length; i++) {
    const currentTimestamp = convertToUnixTimeInMilliseconds(
      tripDetail[i].timestamp
    );

    if (tripDetail[i].speed > 60) {
      if (lastTimestamp === 0) {
        lastTimestamp = currentTimestamp;
      }
    } else {
      if (lastTimestamp !== 0) {

        time += currentTimestamp - lastTimestamp;
        lastTimestamp = 0;
      }
    }
  }

  return time / 60000;
};

export const getOverSpeedDistance = (tripDetail) => {
  let distance = 0;
  let lastDistance = null;

  for (let i = 0; i < tripDetail.length; i++) {
    const currentDistance = tripDetail[i];

    if (tripDetail[i].speed > 60) {
      if (lastDistance === null) {
        lastDistance = currentDistance;
      } else {
        distance = Math.max(
          distance,
          distanceOfTwoPoints(lastDistance, currentDistance)
        );
      }
    }
  }

  return distance;
};
