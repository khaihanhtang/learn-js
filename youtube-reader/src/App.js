import logo from './logo.svg';
import './App.css';
import SearchBar from './components/search_bar';
import API_KEY from './data/constants';
import YTSearch from 'youtube-api-search';
import React, { Component } from 'react';
import VideoList from './components/video_list';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {videos : []};
    YTSearch({key : API_KEY, term : 'surfboard'}, data => {
      this.setState({videos : data});
    });
  }
  render() {
    return (
      <div className="App">
        <SearchBar />
        <VideoList videos={this.state.videos}/>
      </div>
    );
  }
}

export default App;
