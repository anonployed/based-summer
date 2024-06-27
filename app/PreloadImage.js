import { useEffect } from "react";

const PreloadImage = ({ src }) => {
  useEffect(() => {
    const img = new Image();
    img.src = src;
  }, [src]);

  return null;
};

export default PreloadImage;
