import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import { getDocuments, getDocument, updateDocument,deleteDocument, uploadDocument, fileUpload, likeDocument } from "../controllers/fileUpload.js";

router.get('/', getDocuments);
router.get('/:id', getDocument);
router.post("/upload", auth, fileUpload, uploadDocument)
router.patch("/edit/:id", auth, updateDocument);
router.delete("/:id",auth, deleteDocument);
router.patch('/:id/likeUpload',auth, likeDocument);

export default router;