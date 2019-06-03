import React from 'react';
import PropTypes from 'prop-types';

export default function Post({ title, sub, thumbnail, width, height }) {
  return (
    <div className="post">
      <h2>{title}</h2>
      <p>{sub}</p>
      <img src={thumbnail} alt={title} style={{ width, height }} />
    </div>
  );
}

Post.propTypes = {
  title: PropTypes.string,
  sub: PropTypes.string,
  thumbnail: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
