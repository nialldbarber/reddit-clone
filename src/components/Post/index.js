import React from 'react';
import PropTypes from 'prop-types';

export default function Post({ title, sub }) {
  return (
    <div className="post">
      <h2>{title}</h2>
      <p>{sub}</p>
    </div>
  );
}

Post.propTypes = {
  title: PropTypes.string,
  sub: PropTypes.string,
};
