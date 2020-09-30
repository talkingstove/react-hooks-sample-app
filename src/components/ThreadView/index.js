import React from "react";
import "../../index.css";
import ThreadLevel from "./threadLevel";

export default function ThreadView(props) {
  const story = props.story || { kids: [] };
  const kids = story.kids;

  //use "kids" to make a recursive display of all comments on the story
  return (
    <div className="thread-view">
      <div className="thread-story">
        <h4>{story.title}</h4>
        <div>
          <a href={story.url} target="_blank">
            {story.url}
          </a>
        </div>
        <div className="author">by: {story.by}</div>
        <div className="time">at: {new Date(story.time * 1000).toString()}</div>
        <div className="score">score: {story.score}</div>
      </div>
      <h4>Comments</h4>
      <ThreadLevel nesting={0} kids={kids} />
    </div>
  );
}
