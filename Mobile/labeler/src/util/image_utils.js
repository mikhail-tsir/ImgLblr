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

export const resizeAndCompress = async (uri) => {
  let res;
  try {
    res = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 512 } }],
      {
        compress: 0,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: false,
      }
    );
  } catch (err) {
    alert(err);
  }
  return await saveToSaved(res.uri);
};
