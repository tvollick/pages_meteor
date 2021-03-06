import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import { Stories } from '../../../imports/collections/stories';

class StoryList extends React.Component {

  onStoryRemove (story) {
    Meteor.call('stories.remove', story);
  }

  renderList () {
    return this.props.stories.map(story => {
      return(
        <li
          key={story._id}
          className="list-group-item clearfix"
          >
          <h2>{story.title}</h2>

          <Link
            to={`/story/${story._id}`}
            className="btn btn-default pull-right"
          >
            View Story
          </Link>

        </li>
      );
    });
  }

  render () {
    return (
      <ul className="list-group">
        {this.renderList()}
      </ul>
    );
  }
}

export default createContainer((props) => {
    Meteor.subscribe('stories');

    return { stories: Stories.find({pages: props.pageId}).fetch() };

}, StoryList);
