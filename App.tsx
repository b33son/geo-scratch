import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default () => {
  const [ready, setReady] = useState(false);
  const gps = { lat: "122.10", long: "42.31" };
  const [where, setWhere] = useState(gps);
  const [error, setError] = useState(null);

  let geoOptions = {
    enableHighAccuracy: true,
    timeOut: 20000,
    maximumAge: 60 * 60 * 24,
  };

  const geoSuccess = (position: any) => {
    // const { latitude, longitude } = position.coords;
    setWhere({ lat: position.coords.latitude, long: position.coords.longitude });
    setReady(true);
  };

  const geoFailure = (err: any) => {
    setError(err.message);
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure, geoOptions);

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 20 }}>Error: {error}</Text>
      </View>
    );
  }
  if (!ready)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 48 }}>Using Geolocation in React Native</Text>
      </View>
    );
  else {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 20 }}>Lat: {where.lat}</Text>
        <Text style={{ fontSize: 20 }}>Long: {where.long}</Text>
      </View>
    );
  }
};
