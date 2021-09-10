import React, { Component } from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar/SearchBar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Button from "./Components/Button/Button";
import Modal from "./Components/Modal/Modal";
import axios from "axios";
import { smoothScroll } from "./services/smoothScroll";
import { ToastContainer, toast } from "react-toastify";
import Loader from "react-loader-spinner";

axios.defaults.baseURL = "https://pixabay.com/api/";
const KEY = "22496813-a3fbe39786787c712b168fbe4";

export default class App extends Component {
  state = {
    searchValue: "",
    gallery: [],
    page: 1,
    isModalOpen: false,
    reqStatus: "idle,",
    largeImgUrl: "",
  };

  async componentDidUpdate(_, prevState) {
    const { searchValue, page } = this.state;
    try {
      if (prevState.searchValue !== this.state.searchValue) {
        this.setState({
          reqStatus: "pending",
          largeImgUrl: "",
        });
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
          reqStatus: "resolved",
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

  toggleImg = (e) => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: true,
      largeImgUrl: e.target.dataset.large,
    }));
  };

  toggleModal = (e) => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { gallery, reqStatus, isModalOpen, largeImgUrl } = this.state;
    const galleryLength = gallery.length > 1;

    if (reqStatus === "pending") {
      return (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={10000}
        />
      );
    }
    return (
      <div className="Container">
        <SearchBar onSubmit={this.handleSubmit} />
        <ImageGallery onClick={this.toggleImg} gallery={gallery} />
        {galleryLength && <Button onClick={this.handleLoadMore} />}
        {isModalOpen && (
          <Modal src={largeImgUrl} onClose={this.toggleModal}>
            <div style={{ width: 900 }}>
              <img src={largeImgUrl} alt="" />
            </div>
          </Modal>
        )}
        <ToastContainer />
      </div>
    );
  }
}
