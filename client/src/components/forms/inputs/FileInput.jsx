import React, { useEffect, useState } from "react";
import { PhotoIco } from "../../../assets/icons";
import Cropper from "react-easy-crop";
import { readFile } from "../../../helpers";

export const FileInput = ({ formik }) => {
  //TODO Create Croped Img Src
  const [show, setShow] = useState(!!formik.values.file);
  const [state, setState] = useState({
    imageSrc: "",
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 1,
  });
  const fileRef = React.useRef(null);
  const handleFile = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };
  const onCropChange = (crop) => {
    setState((prev) => ({ ...prev, crop }));
  };
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedAreaPixels.width / croppedAreaPixels.height);
  };
  const onZoomChange = (zoom) => {
    setState((prev) => ({ ...prev, zoom }));
  };

  const handleCustomChange = async (e) => {
    e.preventDefault();
    const { name, files } = e.target;
    const file = files[0];
    formik.setFieldValue(name, file);
    const Base64 = await readFile(file);
    setState((prev) => ({
      ...prev,
      imageSrc: Base64,
    }));
  };

  useEffect(() => {
    console.log(show);
    if (!!formik.values.file) {
      setShow(formik.values.file);
      console.log(state);
    }
  }, [formik.values.file]);

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
        </div>
      ) : null}
    </>
  );
};
