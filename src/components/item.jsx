import React from "react";
import PropTypes from "prop-types";

function Item(props) {
  return (
    <tr>
      <th scope="row">{props.item.title}</th>
      <td colSpan="2">{props.item.artist}</td>
      <td>{props.item.album}</td>
      <td>{props.item.duration}</td>
    </tr>
  );
}
Item.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    album: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  }).isRequired,
};
export default Item;
