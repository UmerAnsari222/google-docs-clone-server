import { Server } from "socket.io";
import connectionDB from "./db/db.js";
import {
  getDocument,
  updateDocument,
} from "./controllers/document-controller.js";

connectionDB();

const PORT = 9000;

const io = new Server(PORT, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const document = await getDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });
    socket.on("save-document", async (data) => {
      await updateDocument(documentId, data);
    });
  });
});
