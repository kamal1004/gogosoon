import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

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

const DELETE_USER = gql`
  mutation removeUser($id: String!) {
    removeBook(id:$id) {
      id
    }
  }
`;

class Show extends Component {

  render() {
    return (
        <Query pollInterval={500} query={GET_USER} variables={{ userId: this.props.match.params.id }}>
            {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;

                return (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                            <h4><Link to="/">User List</Link></h4>
                                <h3 className="panel-title">
                                {data.user.title}
                                </h3>
                            </div>
                            <div className="panel-body">
                                <dl>
                                    <dt>Name:</dt>
                                    <dd>{data.user.Name}</dd>
                                    <dt>age:</dt>
                                    <dd>{data.user.age}</dd>
                                    <dt>email:</dt>
                                    <dd>{data.user.email}</dd>
                                    <dt>number:</dt>
                                    <dd>{data.user.number}</dd>
                                </dl>
                                <Mutation mutation={DELETE_USER} key={data.user.id} onCompleted={() => this.props.history.push('/')}>
                                    {(removeUser, { loading, error }) => (
                                        <div>
                                            <form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    removeBook({ variables: { id: data.user.id } });
                                                }}>
                                                <Link to={`/edit/${data.user.id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                            </form>
                                        {loading && <p>Loading...</p>}
                                        {error && <p>Error :( Please try again</p>}
                                        </div>
                                    )}
                                </Mutation>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Query>
    );
  }
}

export default Show;
