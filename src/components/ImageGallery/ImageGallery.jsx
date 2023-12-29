import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { toast } from 'react-toastify';
import { Gallery } from './ImageGallery.styled';
import { fetchPhotos } from '../services/pixabay-api';

export class ImageGallery extends Component {
  state = {
    gallery: null,
    status: 'idle',
    error: null,
    page: 1,
  };
  // "idle"
  // "pending"
  // "resolved"
  // "rejected"

  componentDidMount = () => {
    this.getPhotos('', 'false');
  };

  componentDidUpdate(prevProps) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending' });
      this.getPhotos(nextQuery);
    }
  }

  getPhotos = (query, messages='true') => {
    fetchPhotos(query)
      .then(gallery => {
        if (gallery.totalHits === 0) {
          throw new Error(`Ничего не найдено по запросу "${query}"`);
        }
        if (messages === 'true') {
          toast.success(`Найдено ${gallery.totalHits} картинок`);
        }
        
        this.setState({
          gallery,
          status: 'resolved',
          page: this.state.page + 1,
        });
      })
      .catch(err => this.setState({ error: err.message, status: 'rejected' }));
  };

  render() {
    const { status, gallery, error } = this.state;

    // if (status === 'idle') {
    //   return <h1>Введите запрос для поиска</h1>;
    // }

    if (status === 'pending') {
      return <div>Загружаю</div>;
    }

    if (status === 'resolved') {
      return (
        <Gallery className="gallery">
          {gallery.hits.map(({ id, webformatURL, tags }) => {
            return (
              <ImageGalleryItem key={id} image={webformatURL} tag={tags} />
            );
          })}
        </Gallery>
      );
    }

    if (status === 'rejected') {
      return <h1>{error}</h1>;
    }
  }
}
