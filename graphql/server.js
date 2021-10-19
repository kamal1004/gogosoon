const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP;

const graphql = require('graphql')
const joinMonster = require('join-monster')

// DB
const { Client } = require('pg')
const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "123456789@K",
  database: "postgres"
})
client.connect()

// schema
const Users = new graphql.GraphQLObjectType({
  name: 'Users',
  fields: () => ({
    id: { type: graphql.GraphQLInt },
    Name: { type: graphql.GraphQLString },
    age : { type: graphql.GraphQLString },
    email: { type: graphql.GraphQLString },
    number: { type: graphql.GraphQLString },
  })
});

Users._typeConfig = {
  sqlTable: 'Users',
  uniqueKey: 'id',
}
//query

const QueryRoot = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    Users: {
      type: new graphql.GraphQLList(Users),
      resolve: (parent, args, context, resolveInfo) => {
         return(resolveInfo, {}, sql => {
          return client.query(sql)
         })
      }
    },
    Usersbyid: {
      type: Users,
      args: { id: { type: graphql.GraphQLNonNull(graphql.GraphQLInt) } },
      where: (UsersTable, args, context) => `${UsersTable}.id = ${args.id}`,
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, sql => {
          return client.query(sql)
        })
      }
    },
  })
})
//mutation

const MutationRoot = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    Update: {
      type: Users,
      args: {
        id: { type: graphql.GraphQLInt },
        Name: { type: graphql.GraphQLString },
        age : { type: graphql.GraphQLString },
        email: { type: graphql.GraphQLString },
        number: { type: graphql.GraphQLString },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          return (await client.query("INSERT INTO public.Users (id, Name, age, email, number) VALUES ($1, $2, $3, $4, $5) RETURNING *", [args.id, args.Name, args.age, args.email, args.number])).rows[0]
        } catch (err) {
          throw new Error("Failed to insert new User")
        }
      }
    },
    edit: {
      type: Users,
      args: {
        id: { type: graphql.GraphQLInt },
        Name: { type: graphql.GraphQLString },
        age : { type: graphql.GraphQLString },
        email: { type: graphql.GraphQLString },
        number: { type: graphql.GraphQLString },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          return (await client.query("UPDATE public.Users SET ( Name=$2, age=$3, email=$4, number=$5) where (id = $1) RETURNING *", [args.id, args.Name, args.age, args.email, args.number])).rows[0]
        } catch (err) {
          throw new Error("Failed to edit User")
        }
      }
    },
    delete: {
      type: Users,
      args: {
        id: { type: graphql.GraphQLInt },
        Name: { type: graphql.GraphQLString },
        age : { type: graphql.GraphQLString },
        email: { type: graphql.GraphQLString },
        number: { type: graphql.GraphQLString },
      },
      resolve: async (parent, args, context, resolveInfo) => {
        try {
          return (await client.query("DELETE public.Users where (id=$1) RETURNING *", [args.id, args.Name, args.age, args.email, args.number])).rows[0]
        } catch (err) {
          throw new Error("Failed to Delete User")
        }
      }
    },

  })
})


const schema = new graphql.GraphQLSchema({
  query: QueryRoot,
  mutation: MutationRoot
});

// server
const app = express();
app.use('/api', graphqlHTTP({
  schema: schema,
  graphiql: true
}));
app.listen(4000);
