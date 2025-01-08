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
      <section className="container mb-5">
        <div className="row d-flex flex-row py-5">
          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <h2 className={headerClass}>
                <strong className="text-secondary">{totalSongs}</strong> Songs
              </h2>
              {currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{currentPage}</span> /{" "}
                  <span className="font-weight-bold">{totalPags}</span>
                </span>
              )}
            </div>
            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination
                totalSongs={totalSongs}
                pagLimit={18}
                pagNeighbours={1}
                onPageChanged={this.onPageChanged}
              />
            </div>
            {currentSongs.map(songs => <Item key={Item} song={songs} />  ) }
          </div>
        </div>
      </section>
    );
  }
}
export default App;
