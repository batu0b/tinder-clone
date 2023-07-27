import React, { useEffect, useState } from "react";
import { PhotoIco } from "../../../assets/icons";
import Cropper from "react-easy-crop";
import { readFile } from "../../../helpers";
import { getCroppedImg } from "../../../utils/cropUtils";

export const FileInput = ({ formik }) => {
  const [show, setShow] = useState(!!formik.values.file);
  const [state, setState] = useState({
    imageSrc: "",
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 1,
  });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const fileRef = React.useRef(null);
  //form value
  const handleFile = () => {
    if (fileRef.current) {
      if (formik.values.file !== null) {
        fileRef.current.value = null;
      }
      fileRef.current.click();
    }
  };
  const handleCustomChange = async (e) => {
    e.preventDefault();
    const { name, files } = e.target;
    console.log(e.target);
    const file = files[0];
    if (file) {
      formik.setFieldValue(name, file);
      const Base64 = await readFile(file);
      setState((prev) => ({
        ...prev,
        imageSrc: Base64,
      }));
      setShow(true);
    }
  };

  //crop
  const onCropChange = (crop) => {
    setState((prev) => ({ ...prev, crop }));
  };
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  const onZoomChange = (zoom) => {
    setState((prev) => ({ ...prev, zoom }));
  };
  const handleCrop = async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImg(
          state.imageSrc,
          croppedAreaPixels
        );
        formik.setFieldValue("avatarFile", croppedImage);
        setShow(false);
      }
    } catch (e) {
      console.error("Kırpma işlemi başarısız oldu: ", e);
    }
  };

  return (
    <>
      <button
        onClick={handleFile}
        type="button"
        className="customInput flex justify-center items-center text-gray-500 text-sm w-full"
      >
        <PhotoIco className={`${formik.values.file ? "text-green-500" : ""}`} />
        <input
          ref={fileRef}
          className="customInput hidden"
          name="file"
          onChange={handleCustomChange}
          id="file"
          type="file"
          placeholder="Upload Image"
          accept=".png, .jpg, .jpeg"
        />
      </button>
      {show ? (
        <div className="z-50 top-0 left-0 right-0 bottom-0 bg-white">
          <Cropper
            classes={{ containerClassName: "rounded-md bg-[#111418]" }}
            image={state.imageSrc}
            crop={state.crop}
            zoom={state.zoom}
            aspect={state.aspect}
            cropShape="round"
            showGrid={true}
            onCropChange={onCropChange}
            onCropComplete={onCropComplete}
            onZoomChange={onZoomChange}
          />
          <button
            type="button"
            onClick={handleCrop}
            className="text-white text-2xl font-bold absolute bottom-0 left-0 bg-gradient-to-br h-12 rounded-br-md rounded-bl-md to-[#ff796a] hover:brightness-125 via-[#fa4952] from-[#ff2b64] w-full"
          >
            Crop
          </button>
        </div>
      ) : null}
    </>
  );
};
