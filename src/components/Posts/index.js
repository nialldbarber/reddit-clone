import React, { Component } from 'react';
import uuid4 from 'uuid/v4';
import BottomScrollListener from 'react-bottom-scroll-listener';
import Post from 'components/Post';

/**
 * TODO:
 *
 * * when you reach the bottom of the page
 * * request the next 10 posts
 */

export default class Posts extends Component {
  state = {
    data: [],
    posts: [],
    allPosts: [],
    subreddit: 'learnjavascript',
    postsPerRequest: 15,
    redditPosts: [
      {
        title: '',
        sub: '',
        thumbnail: '',
        thumbnail_height: '',
        thumbnail_width: '',
      },
    ],
    bottomReached: false,
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
        redditPosts: [
          ...prevState.redditPosts,
          { title, sub: subreddit_name_prefixed, thumbnail, height: thumbnail_height, width: thumbnail_width },
        ],
      }));
    });
  }

  handleScroll = () => {
    console.log('reached');
    this.setState({
      bottomReached: true,
    });
  };

  render() {
    const { redditPosts, bottomReached } = this.state;
    return (
      <BottomScrollListener onBottom={this.handleScroll}>
        {redditPosts.map((item) => (
          <Post
            key={uuid4()}
            title={item.title}
            sub={item.sub}
            thumbnail={item.thumbnail}
            width={item.width}
            height={item.height}
          />
        ))}
        <p className={bottomReached === true ? 'show stuff' : 'stuff'}>hello</p>
      </BottomScrollListener>
    );
  }
}
