import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Stories } from '../../../imports/collections/stories';

class StoryEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  componentWillMount () {
    if (this.props.story) {
      console.log('willMount');
      const { title, content } = this.props.story;
      this.setState({
        title,
        content
      });
    }
  }

  componentWillReceiveProps(next){
    console.log('willReceiveProps'); 
    this.setState({
      title: next.story.title,
      content: next.story.content
    });
  }

  handleFormSubmit (e) {
    e.preventDefault();
    Meteor.call('story.update', this.props.story, {
      title: this.state.title,
      content: this.state.content
    });
  }

  handleTitleChange (event) {
    this.setState({title: event.target.value});
  }

  handleContentChange (event) {
    this.setState({content: event.target.value});
  }

  render () {

    return (
      <div>
        <form onSubmit={this.handleFormSubmit.bind(this)}>
          <div className="form-group">
            <label>Title:
            </label>
            <input className="form-control" type="text" value={this.state.title} onChange={this.handleTitleChange} />
          </div>
          <div className="form-group">
            <textarea rows="10" className="form-control" value={this.state.content} onChange={this.handleContentChange} />
          </div>
          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}

export default createContainer ((props) => {

  const { storyId } = props.match.params;
  Meteor.subscribe('stories');

  return { story: Stories.findOne(storyId)};

}, StoryEdit);