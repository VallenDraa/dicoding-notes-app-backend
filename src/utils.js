module.exports = {
  createNote({ id, title, createdAt, updatedAt, tags, body }) {
    return {
      id,
      title,
      createdAt,
      updatedAt,
      tags,
      body,
    };
  },

  createResponse({ status, message, data = null }) {
    return {
      status,
      message,
      data,
    };
  },
};
