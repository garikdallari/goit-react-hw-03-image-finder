import React, { Component } from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar/SearchBar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Button from "./Components/Button/Button";
import axios from "axios";
import { smoothScroll } from "./services/smoothScroll";
import { ToastContainer, toast } from "react-toastify";

axios.defaults.baseURL = "https://pixabay.com/api/";
const KEY = "22496813-a3fbe39786787c712b168fbe4";

export default class App extends Component {
  state = {
    searchValue: "",
    gallery: [],
    page: 1,
  };

  async componentDidUpdate(_, prevState) {
    const { searchValue, page } = this.state;
    try {
      if (prevState.searchValue !== this.state.searchValue) {
        const { data } = await axios.get(
          `?q=${searchValue}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        if (data.hits.length === 0) {
          toast.error(
            "Sorry, there are no images matching your search query. Please try again.",
            {
              autoClose: 3000,
            }
          );
        }

        this.setState((prev) => ({
          gallery: data.hits,
          page: prev.page + 1,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }
  handleLoadMore = async () => {
    const { data } = await axios.get(
      `https://pixabay.com/api/?q=${this.state.searchValue}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );

    this.setState((prev) => ({
      gallery: [...prev.gallery, ...data.hits],
      page: prev.page + 1,
    }));
    smoothScroll();
  };

  handleSubmit = (searchValue) => {
    this.setState({
      searchValue,
    });
  };
  render() {
    const { gallery } = this.state;
    const galleryLength = gallery.length > 1;
    return (
      <div className="Container">
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery gallery={gallery} />
        {galleryLength && <Button onClick={this.handleLoadMore} />}
        <ToastContainer />
      </div>
    );
  }
}
