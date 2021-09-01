import _ from 'lodash';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/search_bar';
import {API_KEY} from './data/constants';
import YTSearch from 'youtube-api-search';
import React, { Component } from 'react';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos : [],
      selectedVideo : null
    };
    this.videoSearch('surfboard');
  }

  videoSearch(term) {
    YTSearch({key : API_KEY, term : term}, data => {
      this.setState(
        {
          videos : data,
          selectedVideo: data[0]
        }
      );
      console.log(data);
    });
  }

  render() {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
    return (
      <div className="App">
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList 
          onVideoSelect={selection => this.setState({videos : this.state.videos, selectedVideo : selection})}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

export default App;
