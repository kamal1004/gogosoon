import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_USER = gql`
    query user($userId: String) {
        user(id: $userId) {
            Name
            age
            email
            number
        }
    }
`;

const UPDATE_USER = gql`
    mutation updateUser(
        $id: Int!,
        $Name: String!,
        $age: String!,
        $email: String!,
        $number: String!) {
        updateUser(
            Name: $Name,
            age: $age,
            email: $email,
            number: $number) {
            id
        }
    }
`;

class Edit extends Component {

  render() {
    let Name, age, email, number;
    return (
        <Query query={GET_USER} variables={{ userId: this.props.match.params.id }}>
            {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;

                return (
                    <Mutation mutation={UPDATE_BOOK} key={data.user.id} onCompleted={() => this.props.history.push(`/`)}>
                        {(updateUser, { loading, error }) => (
                            <div className="container">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title">
                                            EDIT USER
                                        </h3>
                                    </div>
                                    <div className="panel-body">
                                        <h4><Link to="/" className="btn btn-primary">User List</Link></h4>
                                        <form onSubmit={e => {
                                          <form onSubmit={e => {
                                              e.preventDefault();
                                              addBook({ variables: {  Name: Name.value, age: age.value, email: email.value, number: number.value} });
                                              Name.value = "";
                                              age.value = "";
                                              email.value = "";
                                              number.value = "";
                                          }}>
                                          <div className="form-group">
                                              <label htmlFor="author">Name:</label>
                                              <input type="text" className="form-control" name="Name" ref={node => {
                                                  Name = node;
                                              }} placeholder="Name" />
                                          </div>
                                          <div className="form-group">
                                              <label htmlFor="author">age</label>
                                              <input type="text" className="form-control" name="age" ref={node => {
                                                  age = node;
                                              }} placeholder="age" />
                                          </div>
                                          <div className="form-group">
                                              <label htmlFor="author">email:</label>
                                              <textarea className="form-control" name="email" ref={node => {
                                                  email = node;
                                              }} placeholder="email" cols="80" rows="3" />
                                          </div>
                                          <div className="form-group">
                                              <label htmlFor="author">Number:</label>
                                              <input type="text" className="form-control" name="number" ref={node => {
                                                  number = node;
                                              }} placeholder="number" />
                                          </div>
                                            <button type="submit" className="btn btn-success">Submit</button>
                                        </form>
                                        {loading && <p>Loading...</p>}
                                        {error && <p>Error :( Please try again</p>}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Mutation>
                );
            }}
        </Query>
    );
  }
}

export default Edit;
