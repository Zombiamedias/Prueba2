import "./App.css";
import React, { Component } from "react";
import SearchBar from "./components/searchBar";
import Table from "./components/table.jsx";
import Pagination from "./components/pagination.jsx";
import Item from "./components/item";
import SpotifyWebApi from "spotify-web-api-node";


class App extends Component {
  state = {
    allSongs: [],
    currentSongs: [],
    currentPage: null,
    totalPags: null,
  };
  componentDidMount() {
    const { data: allSongs = [] } = SpotifyWebApi.findAll();
    this.setState({ allSongs });
  }
  onPageChanged = (data) => {
    const { allSongs } = this.state;
    const { currentPage, totalPags, pagLimit } = data;
    const offset = (currentPage - 1) * pagLimit;
    const currentSongs = allSongs.slice(offset, offset + pagLimit);
    this.setState({ currentPage, currentSongs, totalPags });
  };
  render() {
    const { allSongs, currentSongs, currentPage, totalPags } = this.state;
    const totalSongs = allSongs.length;
    if (totalSongs === 0) return null;
    const headerClass = [
      "text-dark py-2 pr4 m-0",
      currentPage ? "border-blue border-right" : "",
    ]
      .join(" ")
      .trim();
    return (
      <div className="container mb-5">
        <div className="row d-flex flex-row py-5"></div>
      </div>
    );
  }
}
export default App;
