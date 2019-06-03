import React from 'react';

export default function Post({ title, sub }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>r/{sub}</p>
    </div>
  );
}
