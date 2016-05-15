import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />

        <main>
          {this.props.children}
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;
