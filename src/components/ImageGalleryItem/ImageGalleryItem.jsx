import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, tag, largeImage, onClick }) => {
  const modalImage = { largeImage, tag };

  return (
    <GalleryItem className="gallery-item">
      <GalleryItemImage
        src={image}
        alt={tag}
        onClick={() => {
          onClick(modalImage);
        }}
      />
    </GalleryItem>
  );
};
