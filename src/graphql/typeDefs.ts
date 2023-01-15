const typeDefs = `#graphql  
    type User {
        id: ID!
        email: String!
        token: String!
        fullname: String!
        createdAt: String!
    }
    type DefaultPos {
        x: String!
        y: String!
    }
    input DefaultPos {
        x: String!
        y: String!
    }
    type Note {
        id: ID!
        content: String!
        createdAt: String!
        color: String!
        # defaultPos: DefaultPos!
    }
    input NoteContent {
        content: String!
        color: String!
        # defaultPos: DefaultPos!
    }
    input UserInput {
        fullname: String!
        password: String!
        repeat_password: String!
        email: String!
    }
    type Query {
        getUser(userId: ID!): User
        getUsers: [User]
        getNotes: [Note]
    }
    type Mutation {
        createUser(userInput: UserInput): User!
        createNote(noteInput: NoteContent): [Note]
    }
    `;

export default typeDefs;
