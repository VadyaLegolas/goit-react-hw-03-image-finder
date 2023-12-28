import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    query: '',
    status: 'idle',
  };

  // "idle"
  // "pending"
  // "resolved"
  // "rejected"
  searchSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <div className='app'>
        <Searchbar onSubmit={this.searchSubmit}/>
      </div>
    );
  }
}
