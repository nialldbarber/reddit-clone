import React, { Component } from 'react';
import Post from 'components/Post';

export default class Posts extends Component {
  state = {
    data: [],
    posts: [],
    allPosts: [],
    subreddit: 'learnjavascript',
    postsPerRequest: 500,
    samplePost: [
      {
        title: '',
        sub: '',
        thumbnail: '',
        thumbnail_height: '',
        thumbnail_width: '',
      },
    ],
  };

  async componentDidMount() {
    const { data, posts, allPosts, subreddit, postsPerRequest } = this.state;
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json?limit=${postsPerRequest}`);
    const json = await response.json();
    posts.push(json);
    this.setState({
      data: posts,
    });

    posts.forEach((post) => {
      allPosts.push(...post.data.children);
    });

    allPosts.forEach(({ data: { title, subreddit_name_prefixed, thumbnail, thumbnail_height, thumbnail_width } }) => {
      this.setState((prevState) => ({
        samplePost: [
          ...prevState.samplePost,
          { title, sub: subreddit_name_prefixed, thumbnail, height: thumbnail_height, width: thumbnail_width },
        ],
      }));
    });
  }

  render() {
    const { samplePost, data } = this.state;
    console.log(data);
    return (
      <div>
        {samplePost.map((item, i) => (
          <Post
            key={i}
            title={item.title}
            sub={item.sub}
            thumbnail={item.thumbnail}
            width={item.width}
            height={item.height}
          />
        ))}
      </div>
    );
  }
}
