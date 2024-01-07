import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { toast } from 'react-toastify';
import { Gallery } from './ImageGallery.styled';
import { fetchPhotos } from '../services/pixabay-api';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

export class ImageGallery extends Component {
  state = {
    gallery: null,
    error: null,
    isLoading: false,
    showModal: false,
    isLoadMore: false,
    selectedImage: null,
    page: 1,
  };

  componentDidMount = () => {
    this.setState({ isLoading: true });
    this.getPhotos('', 'false');
  };

  componentDidUpdate(prevProps) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    if (prevQuery !== nextQuery) {
      this.setState({ isLoading: true, gallery: null });
      this.getPhotos(nextQuery);
    }
  }

  getPhotos = async (query, messages = 'true') => {
    try {
      this.setState({ page: 1 });
      const gallery = await fetchPhotos(query, this.state.page);
      if (gallery.totalHits === 0) {
        throw new Error(`Ничего не найдено по запросу "${query}"`);
      }
      if (messages === 'true') {
        toast.success(`Найдено ${gallery.totalHits} картинок`);
      }

      this.setState({
        gallery,
        isLoading: false,
      });
    } catch (err) {
      this.setState({ error: err.message, isLoading: false });
    }
  };

  tongleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  addImgeToModal = item => {
    this.setState({ selectedImage: item });
    this.tongleModal();
  };

  render() {
    const { gallery, error, isLoadMore, isLoading, showModal, selectedImage } =
      this.state;

    return (
      <>
        {isLoading && <Loader />}
        {showModal && (
          <Modal image={selectedImage} onClose={this.tongleModal} />
        )}
        {error && <h1>{error}</h1>}
        {gallery && (
          <Gallery className="gallery">
            {gallery.hits.map(({ id, webformatURL, tags, largeImageURL }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  image={webformatURL}
                  tag={tags}
                  largeImage={largeImageURL}
                  onClick={this.addImgeToModal}
                />
              );
            })}
          </Gallery>
        )}
        {isLoadMore && <Button />}
      </>
    );
  }
}
