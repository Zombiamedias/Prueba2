import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";


// pagination component
class Pagination extends Component {
  constructor(props) {
    super(props);
    const { totalSongs = null, pageLimit = 30, pageNeighbours = 0 } = props; //props delcaration 
    this.pageLimit = typeof pageLimit === "number" ? pageLimit : 30; // pagelimit is set to 30 
    this.totalSongs = typeof totalSongs === "number" ? totalSongs : 0; // total songs is set to 0

    this.pageNeighbours =
      typeof pageNeighbours === "number"
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0; // page neighbours is set to 0 but depends about the results
    this.totalSongs = Math.ceil(this.totalSongs / this.pageLimit); // total songs is calculated by dividing total songs by page limit and rounding up to the nearest integer
    this.state = { currentpage: 1 }; // current page is set to 1
  }
}
// Proptypes
Pagination.propTypes = {
  totalSongs: PropTypes.number.isRequired,
  pageLimit: PropTypes.number.isRequired,
  pageNeighbours: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func,
};

export default Pagination;
