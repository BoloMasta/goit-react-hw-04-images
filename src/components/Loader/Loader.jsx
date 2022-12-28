import { Component } from 'react';
import { Dna } from 'react-loader-spinner';

export class Loader extends Component {
  render() {
    return (
      <Dna
        visible={true}
        height="80"
        width="180"
        ariaLabel="dna-loading"
        wrapperStyle={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          margin: '0 auto',
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          zIndex: '9999',
        }}
        wrapperClass="dna-wrapper"
      />
    );
  }
}
