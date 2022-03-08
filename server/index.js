const { ApolloServer, gql } = require("apollo-server");
const { search } = require("./nasa-api");

const typeDefs = gql`
  type Query {
    search(q: String!, from: Int): SearchResult!
  }

  type SearchResult {
    items: [SearchResultItem!]!
    total: Int
  }

  type SearchResultItem {
    href: String!
    description: String
    title: String!
  }
`;


const resolvers = {
  Query: {
    search: async (_parent, { q, from }) => {
      try {
        const result = await search(q, from ?? 1);
        return result;
      } catch (error) {
        console.log(`> Error fetching data from NASA API: ${error}`);
        throw new Error("Internal error");
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const port = process.env.PORT || 4000;

server.listen({ port }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
