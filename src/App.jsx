import "./App.css";
import React, { Component } from "react";
import SearchBar from "./components/searchBar";
import Table from "./components/table.jsx";
import Pagination from "./components/pagination.jsx";
import Item from "./components/item";
class App extends Component {
  state = {
    allSongs: [],
    currentSongs: [],
    currentPage: null,
    totalPags: null,
  };
  componentDidMount() {
    const { data: allSongs = [] } = Songs.findAll();
    this.setState({ allSongs });
  }
  onPageChanged = (data) => {
    const { allSongs } = this.state;
    const { currentPage, totalPags, pagLimit } = data;
    const offset = (currentPage - 1) * pagLimit;
    const currentSongs = allSongs.slice(offset, offset + pagLimit);
    this.setState({ currentPage, currentSongs, totalPags });
  };
}
export default App;
