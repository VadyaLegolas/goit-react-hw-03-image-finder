import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { toast } from 'react-toastify';
import { Gallery } from './ImageGallery.styled';
import PhotosApiService from 'components/services/pixabay-api';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

export class ImageGallery extends Component {
  state = {
    gallery: null,
    error: null,
    isLoading: false,
    showModal: false,
    isLoadMore: true,
    selectedImage: null,
    page: 1,
  };

  photosApiService = new PhotosApiService();

  async componentDidMount (){
    console.log("mount")
    this.setState({ isLoading: true, gallery:null });
    await this.getPhotos(false);
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    if (prevQuery !== nextQuery) {
      this.setState({ isLoading: true, gallery: null });

      // this.getPhotos(nextQuery);
      // this.setState({ page: prevState.page + 1 });
    }
  }

  getPhotos = async (messages = 'true') => {
    try {
      const query = 'cat';
      this.photosApiService.query = query;
      console.log('this.photosApiService.query: ', this.photosApiService.query);

      const gallery = await this.photosApiService.fetchPhotos();
      if (gallery.totalHits === 0) {
        throw new Error(`Ничего не найдено по запросу "${query}"`);
      }
      if (messages === 'true') {
        toast.success(`Найдено ${gallery.totalHits} картинок`);
      }
      if (this.state.gallery) {
        this.setState(prevState => {
          return {
            gallery: {
              totalHits: gallery.totalHits,
              hits: [...prevState.gallery.hits, ...gallery.hits],
            },
            isLoading: false,
          };
        });
      } else {
        this.setState({
          gallery: { totalHits: gallery.totalHits, hits: [...gallery.hits] },
        });
      }
    } catch (err) {
      this.setState({ error: err.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  tongleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  addImageToModal = item => {
    this.setState({ selectedImage: item });
    this.tongleModal();
  };

  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1, isLoading: true };
    });
    this.getPhotos(this.props.query, this.state.page + 1, false);
  };

  render() {
    const { gallery, error, isLoadMore, isLoading, showModal, selectedImage } =
      this.state;

    return (
      <>
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
                  onClick={this.addImageToModal}
                />
              );
            })}
          </Gallery>
        )}
        {isLoading && <Loader />}
        {isLoadMore && <Button onLoadMore={this.loadMore}>LoadMore</Button>}
      </>
    );
  }
}
