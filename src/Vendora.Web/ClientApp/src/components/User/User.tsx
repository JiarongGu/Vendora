import * as React from 'react';

export interface UserProps {
  version: String;
}

export default class User extends React.Component<UserProps> {
  render() {
    const { version } = this.props;
    return (
      <div>User Page</div>
    );
  }
}