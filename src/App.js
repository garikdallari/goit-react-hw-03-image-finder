import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import SearchBar from "./Components/SearchBar/SearchBar";
import ImageGallery from "./Components/SearchBar/ImageGallery/ImageGallery";

// axios.defaults.baseURL = "https://pixabay.com/api/?";
const KEY = "22496813-a3fbe39786787c712b168fbe4";

export default class App extends Component {
  state = {
    searchValue: "",
    gallery: [],
    page: 1,
  };

  async componentDidUpdate(_, prevState) {
    try {
      if (prevState.searchValue !== this.state.searchValue) {
        const { data } = await axios.get(
          `https://pixabay.com/api/?q=${this.state.searchValue}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        this.setState({
          gallery: data.hits,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleSubmit = (searchValue) => {
    this.setState({
      searchValue,
    });
  };
  render() {
    const { gallery } = this.state;
    return (
      <div>
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery gallery={gallery} />
      </div>
    );
  }
}
