import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { toast } from 'react-toastify';
import { Gallery } from './ImageGallery.styled';
import { fetchPhotos } from '../services/pixabay-api';
import { Loader } from 'components/Loader/Loader';

export class ImageGallery extends Component {
  state = {
    gallery: null,
    status: 'pending',
    error: null,
  };

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
        status: 'resolved',
      });
    } catch (err) {
      this.setState({ error: err.message, status: 'rejected' });
    }
  };

  render() {
    const { status, gallery, error } = this.state;

    // if (status === 'idle') {
    //   return <h1>Введите запрос для поиска</h1>;
    // }

    if (status === 'pending') {
      return <Loader />;
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
