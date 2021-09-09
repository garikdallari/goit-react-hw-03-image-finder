import React from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

function ImageGallery({ gallery }) {
  return (
    <ul className="ImageGallery">
      {gallery.map((item) => (
        <ImageGalleryItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

export default ImageGallery;
