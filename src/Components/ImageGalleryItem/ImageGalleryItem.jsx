import React from "react";

function ImageGalleryItem({ item }) {
  return (
    <li className="ImageGalleryItem">
      <img src={item.webformatURL} alt="" className="ImageGalleryItem-image" />
    </li>
  );
}

export default ImageGalleryItem;
