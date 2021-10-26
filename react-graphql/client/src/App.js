import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_USERS = gql`
  {
    Users {
      id
      Name
      age
      email
      number
    }
  }
`;

class App extends Component {

  render() {
    return (
      <Query pollInterval={500} query={GET_USERS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    LIST OF USERS
                  </h3>
                  <h4><Link to="/create">Add User</Link></h4>
                </div>
                <div className="panel-body">
                  <table className="table table-stripe">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>age</th>
                        <th>email</th>
                        <th>number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.Users.map((user, index) => (
                        <tr key={index}>
                          <td><Link to={`/show/${user.id}`}>{user.Name}>{user.age}>{user.email}>{user.number}</Link></td>
                          <td>{book.Name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default App;
