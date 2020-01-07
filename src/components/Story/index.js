import React from 'react';
import '../../index.css';

export default function Story(props) {

  const storyData = props.storyData;
  const comments = storyData.kids ? storyData.kids.length : 0;

  return (

    <li key={storyData.id} className="story-list-item">
      <h4>
        <a href="javascript:;" onClick={() => props.showThreadView(storyData)}>{storyData.title}</a>
      </h4>
      <div>
        <a href={storyData.url} target="_blank">{storyData.url}</a>
      </div>
      <div className="author">
        by: {storyData.by}
      </div>
      <div className="time">
        at: {new Date(storyData.time * 1000).toString()}
      </div>
      <div className="score">
        score: {storyData.score}
      </div>
      <div className="score">
        comments: {comments}
      </div>
    </li>
  );
}