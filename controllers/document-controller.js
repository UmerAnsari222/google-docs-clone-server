import Document from "../models/Document.js";

export const getDocument = async (id) => {
  if (id === null) return;
  const document = await Document.findById(id);
  if (document) return document;

  return Document.create({ _id: id, data: "" });
};

export const updateDocument = async (id, data) => {
  return Document.findByIdAndUpdate(id, { data });
};
