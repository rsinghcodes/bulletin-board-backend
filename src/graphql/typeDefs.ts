const typeDefs = `#graphql  
    type User {
        id: ID!
        email: String!
        token: String!
        fullname: String!
        createdAt: String!
    }
    type DefaultPos {
        x: Int!
        y: Int!
    }
    type Note {
        id: ID!
        content: String!
        createdAt: String!
        color: String!
        defaultPos: DefaultPos!
    }
    input DefaultPosition {
        x: Int!
        y: Int!
    }
    input NoteInput {
        content: String!
        color: String!
        defaultPos: DefaultPosition!
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
        loginUser(email: String!, password: String!): User!
        createNote(noteInput: NoteInput): Note
        deleteNote(contentId: ID!): String!
    }
    `;

export default typeDefs;
