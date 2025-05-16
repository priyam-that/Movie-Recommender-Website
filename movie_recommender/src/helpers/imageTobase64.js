const imageToBase64 = async (image) => {
    console.log("Image file:", image); // Check if this is a valid File or Blob

    if (!(image instanceof Blob)) {
        throw new Error("Provided input is not a Blob or File object.");
    }

    const reader = new FileReader();
    reader.readAsDataURL(image);  // reads the image as a Base64-encoded string (data URL format)

    const data = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result); // When the FileReader successfully reads the image, the result is returned via resolve
        reader.onerror = (error) => reject(error);
    });

    return data;
};

export default imageToBase64;

