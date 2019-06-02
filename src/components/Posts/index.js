import React, { useEffect } from 'react';

export default function Posts() {
  // Logic below inspired by: https://www.youtube.com/watch?v=k6CepxRngHo&list=LLmvG5jaA89_JGo6GNKAj8ow&index=2&t=0s

  // fetching post & config
  const postsPerRequest = 100;
  const maxPostsToFetch = 500;
  const maxRequests = maxPostsToFetch / postsPerRequest;
  const responses = [];

  useEffect(() => {
    const subreddit = 'pics';
    // pass down to fetchPosts function
    fetchPosts(subreddit);
  });

  const fetchPosts = async (subreddit) => {
    // fetch subreddit
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json?limit=${postsPerRequest}`);
    // get the json format of fetch
    const responseJSON = await response.json();
    // push that into responses array
    responses.push(responseJSON);
    // if there are more posts to fetch, continue to fetch posts
    if (responseJSON.data.after && responses.length < maxRequests) {
      fetchPosts(subreddit, responseJSON.data.after);
      return;
    }
    // send responses to parseResults function
    parseResults(responses);
  };

  const parseResults = (responses) => {
    const allPosts = [];

    responses.forEach((response) => {
      allPosts.push(...response.data.children);
    });

    console.log(allPosts);

    const postData = {};

    allPosts.forEach(({ data: { author, title, subreddit_name_prefixed } }) => {
      postData[author] = !postData[author]
        ? {
            title,
            subreddit_name_prefixed,
          }
        : {
            title: postData[author].title + title,
            subreddit_name_prefixed: postData[author].subreddit_name_prefixed + subreddit_name_prefixed,
          };
    });

    const userList = Object.keys(postData).map((username) => ({
      username,
      title: postData[username].title,
      subreddit_name_prefixed: postData[username].subreddit_name_prefixed,
    }));

    const sortedList = userList.sort((userA, userB) => userB.score - userA.score);

    displayPosts(sortedList);
  };

  const displayPosts = (sortedList) => {
    const container = document.getElementById('container');
    sortedList.forEach(({ username, title }) => {
      const userCard = document.createElement('a');
      userCard.href = `https://www.reddit.com/user/${username}`;
      userCard.classList.add('user-card');
      userCard.innerText = `${title} - ${username}`;

      container.appendChild(userCard);
    });
  };

  return (
    <div>
      <h1>Posts</h1>
      <div id="container" />
    </div>
  );
}
