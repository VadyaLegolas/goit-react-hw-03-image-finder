import { Component } from 'react';
import { Hourglass } from 'react-loader-spinner';
import { LoaderDiv } from './Loader.styled';

export class Loader extends Component {
  render() {
    return (
      <LoaderDiv>
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          wrapperClass=""
          colors={['#306cce', '#72a1ed']}
        />
      </LoaderDiv>
    );
  }
}
