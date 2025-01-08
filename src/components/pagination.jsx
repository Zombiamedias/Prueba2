import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// RANGE SLIDER
const leftP = "LEFT";
const rightP = "RIGHT";

const range = (from, to, step = 1) => {
  var i = from;
  const range = [];
  //logic
  while (i <= to) {
    range.push(i);
    i += step;
  }
  return range;
};

// pagination component
class Pagination extends Component {
  // pages constructor
  constructor(props) {
    super(props);
    const { totalSongs = null, pagLimit = 30, pagNeighbours = 0 } = props; //props delcaration
    this.pagLimit = typeof pagLimit === "number" ? pagLimit : 30; // pagelimit is set to 30
    this.totalSongs = typeof totalSongs === "number" ? totalSongs : 0; // total songs is set to 0

    this.pagNeighbours =
      typeof pagNeighbours === "number"
        ? Math.max(0, Math.min(pagNeighbours, 2))
        : 0; // page neighbours is set to 0 but depends about the results
    this.totalSongs = Math.ceil(this.totalSongs / this.pageLimit); // total songs is calculated by dividing total songs by page limit and rounding up to the nearest integer
    this.state = { crrntpage: 1 }; // current page is set to 1
  }

  // pagination methods
  fetchPageNumbers = () => {
    const totalPags = this.totalPags;
    const currentPag = this.state.crrntpage;
    const pagNeighbours = this.pagNeighbours;
    const totalNums = this.pagNeighbours * 2 + 3;
    const totalBlck = totalNums + 2;
    // logic
    if (totalPags > totalBlck) {
      const startPag = Math.max(2, currentPag - pagNeighbours);
      const endPag = Math.min(totalPags - 1, currentPag + pagNeighbours);
      let pags = range(startPag, endPag);

      const leftSpll = startPag > 2;
      const rightSpll = (endPag < totalPags) - 1;
      const spillOffset = totalNums - pags.length++;
      // logic cases
      switch (true) {
        case leftSpll && !rightSpll: {
          const extraPgs = range(startPag - spillOffset, startPag - 1);
          pags = [leftP, ...extraPgs, ...pags];
          break;
        }

        case !leftSpll && rightSpll: {
          const extraPgs = range(endPag + 1, endPag + spillOffset);
          pags = [...pags, ...extraPgs, rightP];
          break;
        }
        case leftSpll && rightSpll:
        default: {
          pags = [leftP, ...pags, rightP];
          break;
        }
      }
      return [1, ...pags, totalPags];
    }
    return range(1, totalPags);
  };

  render() {
    if (!this.totalSongs || this.totalPags === 1) return null;

    const { currentPag } = this.state;
    const pags = this.fetchPageNumbers();

    return (
      <Fragment>
        <nav aria-label="Songs pagination">
          <ul className="pagination">
            {pags.map((pag, index) => {
              // left case
              if (pag === leftP)
                return (
                  <li key={index} className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Previous"
                      onClick={this.handleMoveLeft}
                    >
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Provious</span>
                    </a>
                  </li>
                );
              // right case
              if (pag === rightP)
                return (
                  <li key={index} className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Next"
                      onClick={this.handleMoveRight}
                    >
                      <span aria-hidden="true"></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                );
              // default case
              return (
                <li
                  key={index}
                  className={`page-items${currentPag === pag ? " active" : ""}`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={this.handleClick(pag)}
                  >
                    {pag}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </Fragment>
    );
  }
  //componen Mount
  componentDidMount() {
    this.gotoPag(1);
  }

  gotoPag = (pag) => {
    const { onPageChanged = (f) => f } = this.props;
    const currentPag = Math.max(0, Math.min(pag, this.totalPags));
    const pagData = {
      currentPag,
      totalPags: this.pageLimit,
      totalSongs: this.totalSongs,
    };
    this.setState({ currentPag }, () => onPageChanged(pagData));
  };
  handleClick = (pag) => (evt) => {
    evt.preventDefault();
    this.gotoPag(pag);
  };
  handleMoveLeft = (evt) => {
    evt.preventDefault();
    this.gotoPag(this.state.currentPag - this.pagNeighbours * 2 - 1);
  };
  handleMoveRight = (evt) => {
    evt.preventDefault();
    this.gotoPag(this.state.currentPag + this.pagNeighbours * 2 + 1);
  };
}

// Proptypes
Pagination.propTypes = {
  totalSongs: PropTypes.number.isRequired,
  pagLimit: PropTypes.number.isRequired,
  pagNeighbours: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func,
};
export default Pagination;
