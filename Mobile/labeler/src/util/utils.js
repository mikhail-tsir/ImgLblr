import * as FileSystem from "expo-file-system";

import { queueLocation, savedLocation } from "../config/constants";

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

// saves image to saved. Image must already be in queue
export async function saveToSaved(uri) {
  var imgName = getFileName(uri);
  FileSystem.copyAsync({
    from: uri,
    to: savedLocation + imgName,
  }).catch((err) => console.log(err.message));

  return savedLocation + imgName;
}

export function getFileName(path) {
  let temp = path.split("/");
  return temp[temp.length - 1];
}

export function queueToSavedName(queuePath) {
  return savedLocation + getFileName(queuePath);
}
