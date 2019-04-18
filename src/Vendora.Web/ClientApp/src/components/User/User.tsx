import * as React from 'react';

export interface UserProps {}

export default class User extends React.Component<UserProps> {
  render() {
    const { version } = this.props;
    return (
      <div>User Page</div>
    );
  }
}