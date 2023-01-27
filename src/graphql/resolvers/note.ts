import { GraphQLError } from 'graphql';

import Note, { NoteDoc } from '../../models/Note';
import { NoteType } from '../../interface/note';
import { validateNoteContent } from '../../utils/validators';
import verifyAuth from '../../middleware/verifyAuth';

export default {
  Query: {
    getNotesByUserId: async (_: null, {}, context: any) => {
      try {
        const user = verifyAuth(context);
        const notes = await Note.find({ userId: user.id });

        if (notes) {
          return notes;
        } else {
          throw new GraphQLError('No notes available!', {
            extensions: {
              code: 'NOT_FOUND',
            },
          });
        }
      } catch (errors) {
        throw errors;
      }
    },
  },
  Mutation: {
    createNote: async (
      _: null,
      { noteInput: { content, color, defaultPos } }: { noteInput: NoteType },
      context: any
    ) => {
      try {
        const user = verifyAuth(context);
        const { isValid, errors } = validateNoteContent({
          content,
        });

        if (!isValid) {
          throw new GraphQLError('Errors', {
            extensions: { code: 'BAD_USER_INPUT', errors },
          });
        }

        const noteContent = await Note.findOne({ content });
        if (noteContent) {
          throw new GraphQLError('Content is already available.', {
            extensions: {
              code: 'BAD_USER_INPUT',
              errors: {
                content: 'Content is already available.',
              },
            },
          });
        }

        const newNote = new Note({
          content,
          color,
          defaultPos,
          userId: user.id,
          createdAt: new Date().toISOString(),
        });

        const notes = await newNote.save();

        return notes;
      } catch (errors) {
        throw errors;
      }
    },
    deleteNote: async (
      _: null,
      { contentId }: { contentId: string },
      context: any
    ) => {
      try {
        const user = verifyAuth(context);
        const note: NoteDoc | null = await Note.findById(contentId);

        if (note) {
          if (user.id == note?.userId) {
            const deletedNotes = await note?.delete();
            return deletedNotes;
          } else {
            throw new GraphQLError('Action not allowed', {
              extensions: { code: 'AUTHENTICATION_ERROR' },
            });
          }
        }
      } catch (errors) {
        throw errors;
      }
    },
    updateBoardPosition: async (
      _: null,
      {
        contentId,
        defaultPos,
      }: { contentId: string; defaultPos: { x: string; y: string } },
      context: any
    ) => {
      try {
        const user = verifyAuth(context);
        const note: NoteDoc | null = await Note.findById(contentId);

        if (user.id == note?.userId) {
          const updatedNote = await Note.findByIdAndUpdate(
            contentId,
            { defaultPos },
            { new: true }
          );

          return updatedNote;
        } else {
          throw new GraphQLError('Action not allowed', {
            extensions: { code: 'AUTHENTICATION_ERROR' },
          });
        }
      } catch (errors) {
        throw errors;
      }
    },
  },
};
