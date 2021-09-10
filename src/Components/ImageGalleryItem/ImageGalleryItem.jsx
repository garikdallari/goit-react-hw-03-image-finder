import React from "react";

function ImageGalleryItem({ item, onClick }) {
  return (
    <li className="ImageGalleryItem">
      <img
        data-large={item.largeImageURL}
        onClick={onClick}
        src={item.webformatURL}
        alt=""
        className="ImageGalleryItem-image"
      />
    </li>
  );
}

export default ImageGalleryItem;
