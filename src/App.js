import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import TopStoryList from './components/TopStoryList';
import ThreadView from './components/ThreadView';
import { Button } from 'reactstrap';

function App() {
  const showThreadView = (story) => {
   setStoryInThreadView(story);
  }

  const hideThreadView = () => {
   setStoryInThreadView(null);
  }

  const [storyInThreadView, setStoryInThreadView] = useState(null);

  const storyListClasses = storyInThreadView ? 'main-comp hide' : 'main-comp';
  const threadClasses = !storyInThreadView ? 'main-comp hide' : 'main-comp';

  return (
    <div>
      <div className="header">
        Welcome to HackerNews Reader!
        {storyInThreadView ? 
        <div>
          <Button onClick={hideThreadView}>
            BACK TO STORIES
          </Button>
        </div>
        : null}
      </div>
      <div className={storyListClasses}>
        <TopStoryList showThreadView={showThreadView} />
      </div>
      <div className={threadClasses}>
        <ThreadView story={storyInThreadView} hideThreadView={hideThreadView} />
      </div>
    </div>
  );
}


export default App;
