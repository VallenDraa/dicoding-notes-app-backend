const { nanoid } = require('nanoid');
const { notes } = require('./notes');
const { createNote, createResponse } = require('./utils');

/** @type {import('@hapi/hapi').ServerRoute['handler']} */
const addNoteHandler = (req, h) => {
  const { title, tags = [], body } = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = createNote({
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt,
  });
  notes.push(newNote);
  const isSuccess = notes.find(note => note.id === id) !== undefined;

  if (isSuccess) {
    const response = h.response(
      createResponse({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: { noteId: id },
      }),
    );
    return response.code(201);
  }

  const failResponse = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  return failResponse.code(500);
};

const getAllNotesHandler = () =>
  createResponse({
    status: 'success',
    data: {
      notes,
    },
  });

/** @type {import('@hapi/hapi').ServerRoute['handler']} */
const getNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const note = notes.find(currentNote => currentNote.id === id);

  if (note) {
    return createResponse({
      status: 'success',
      message: 'Catatan berhasil ditemukan',
      data: { note },
    });
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });

  return response.code(400);
};

/** @type {import('@hapi/hapi').ServerRoute['handler']} */
const editNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  const { title, tags, body } = req.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex(note => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response(
      createResponse({
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      }),
    );
    return response.code(200);
  }

  const response = h.response(
    createResponse({
      status: 'fail',
      message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    }),
  );
  return response.code(404);
};

/** @type {import('@hapi/hapi').ServerRoute['handler']} */
const deleteNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const index = notes.findIndex(note => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    return response.code(200);
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  return response.code(404);
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
