import fetch from 'cross-fetch'

export function get(subreddit) {
  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
}