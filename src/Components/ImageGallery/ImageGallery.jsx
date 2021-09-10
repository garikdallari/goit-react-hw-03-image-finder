import React from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

function ImageGallery({ gallery, onClick }) {
  return (
    <ul className="ImageGallery">
      {gallery.map((item) => (
        <ImageGalleryItem onClick={onClick} key={item.id} item={item} />
      ))}
    </ul>
  );
}

export default ImageGallery;
