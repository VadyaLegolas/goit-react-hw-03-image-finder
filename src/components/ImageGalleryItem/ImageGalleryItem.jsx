import { GalleryItem, GalleryItemImage } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({image, tag}) => {
  return (
    <GalleryItem className="gallery-item">
      <GalleryItemImage src={image} alt={tag} />
    </GalleryItem>
  );
};
