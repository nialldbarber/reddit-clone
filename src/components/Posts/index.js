import React, { useState } from "react";

export default function Posts() {
  const [subredditSearch, setSubredditSearch] = useState("");

  const postsPerRequest = 100;
  const maxPostsToFetch = 500;
  const maxRequests = maxPostsToFetch / postsPerRequest;
  const responses = [];

  const handleSubmit = e => {
    e.preventDefault();
    // get value of input
    const subreddit = subredditSearch;
    // pass down to fetchPosts function
    fetchPosts(subreddit);
  };

  const fetchPosts = async (subreddit, afterParam) => {
    const response = await fetch(
      `https://www.reddit.com/r/${subreddit}.json?limit=${postsPerRequest}${
        afterParam ? `&after=${afterParam}` : ""
      }`
    );
    const responseJSON = await response.json();
    responses.push(responseJSON);

    if (responseJSON.data.after && responses.length < maxRequests) {
      fetchPosts(subreddit, responseJSON.data.after);
      return;
    }

    parseResults(responses);
  };

  const parseResults = responses => {
    const allPosts = [];

    responses.forEach(response => {
      allPosts.push(...response.data.children);
    });

    let statsByUser = {};

    allPosts.forEach(({ data: { author, score } }) => {
      statsByUser[author] = !statsByUser[author]
        ? {
            postCount: 1,
            score
          }
        : {
            postCount: statsByUser[author].postCount + 1,
            score: statsByUser[author].score + score
          };
    });

    const userList = Object.keys(statsByUser).map(username => ({
      username,
      score: statsByUser[username].score,
      postCount: statsByUser[username].postCount
    }));

    const sortedList = userList.sort(
      (userA, userB) => userB.score - userA.score
    );

    displayRankings(sortedList);
  };

  const displayRankings = sortedList => {
    const container = document.getElementById("container");
    sortedList.forEach(({ username, score, postCount }, i) => {
      let rank = i + 1;
      const userCard = document.createElement("a");
      userCard.href = `https://www.reddit.com/user/${username}`;
      userCard.classList.add("user-card");
      userCard.innerText = `${rank}. ${username} - ${postCount} post(s) - ${score} point(s)`;

      container.appendChild(userCard);
    });
  };

  // React events
  const handleChange = e => {
    setSubredditSearch(e.target.value);
  };

  return (
    <div>
      <h1>Posts</h1>
      <form onSubmit={handleSubmit}>
        <input value={subredditSearch} onChange={handleChange} />
        <button type="submit">Click me</button>
      </form>
      <div id="container" />
    </div>
  );
}
