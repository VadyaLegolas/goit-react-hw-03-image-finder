import { GalleryItem, GalleryItemImage } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({image, tag, children}) => {
  return (
    <GalleryItem className="gallery-item">
      <GalleryItemImage src={image} alt={tag} />
      {children}
    </GalleryItem>
  );
};
