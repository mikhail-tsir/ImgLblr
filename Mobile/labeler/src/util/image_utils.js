import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";

import { saveToSaved } from "./utils";

export const uploadImage = async (url, fields, imgPath) => {
  const compressed = await resizeAndCompress(imgPath);
  const form = new FormData();
  Object.keys(fields).forEach((key) => {
    form.append(key, fields[key]);
  });
  form.append("file", { uri: compressed, type: "image/jpeg" });

  return await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
    body: form,
  });
};

export const resizeAndCompress = async (uri, compression = 0) => {
  console.log("uri before resizing:", uri);
  let res;
  try {
    res = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 512 } }],
      {
        compress: compression,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: false,
      }
    );
  } catch (err) {
    alert(err);
  }
  console.log("uri after resizing", res.uri);
  return res.uri;
};
