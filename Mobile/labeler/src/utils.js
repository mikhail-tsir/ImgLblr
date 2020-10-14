import React from "react";
import * as FileSystem from "expo-file-system";

import { queueLocation, saveLocation } from "./constants";

function getImgName() {
  var d = new Date();
  return d.toISOString() + ".jpg";
}

export async function saveToQueue(uri) {
  var imgName = getImgName();
  FileSystem.copyAsync({
    from: uri,
    to: queueLocation + imgName,
  }).catch((err) => console.log(err.message));

  return queueLocation + imgName;
}