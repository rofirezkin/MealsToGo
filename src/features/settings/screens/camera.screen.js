import React, {useRef, useState, useEffect, useContext} from "react";
import {Camera} from "expo-camera";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {View, TouchableOpacity} from "react-native";
import {Text} from "../../../components/typography/text.component";

import {AuthenticationContext} from "../../../services/authentication/authentication.context";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;

export const CameraScreen = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();
  const {user} = useContext(AuthenticationContext);

  const snap = async () => {
    console.log("fsfssfsfs");
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <TouchableOpacity onPress={snap}>
      <ProfileCamera
        ref={camera => (cameraRef.current = camera)}
        type={Camera.Constants.Type.front}
        ratio={"16:9"}
      />
      <View
        style={{
          position: "absolute",
          bottom: 20,
          backgroundColor: "white",
          alignSelf: "center",
          height: 70,
          width: 70,
          borderRadius: 70 / 2,
        }}>
        <Text style={{textAlign: "center", justifyContent: "center"}}>
          Post
        </Text>
      </View>
    </TouchableOpacity>
  );
};
