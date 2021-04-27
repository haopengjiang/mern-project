import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import DOCUMENT from "../models/document.js";
import multer from "multer";
import AWS from "aws-sdk";
import mongoose from 'mongoose';

const router = express.Router();
// Multer ships with storage engines DiskStorage and MemoryStorage
// And Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

// Get all Documents s Routes
export const getDocuments =(req, res, next) => {
  DOCUMENT.find(
    {},
    null,
    {
      sort: { createdAt: 1 }
    },
    (err, docs) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(docs);
    }
  );
};

// Route to get a single existing GO data (needed for the Edit functionality)
export const getDocument = (req, res, next) => {
  DOCUMENT.findById(req.params.id, (err, go) => {
    if (err) {
      return next(err);
    }
    res.json(go);
  });
};

// route to upload a pdf document file
// In upload.single("file") - the name inside the single-quote is the name of the field that is going to be uploaded.
 
export const fileUpload = upload.single("file");

export const uploadDocument = function(req, res) {
  const file = req.file;
  const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });

  console.log(process.env.AWS_ACCESS_KEY_ID);
  console.log(process.env.AWS_SECRET_ACCESS_KEY);

  //Where you want to store your file

  var params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read"
  };

  s3bucket.upload(params, function(err, data) {
    if (err) {
      res.status(500).json({ error: true, Message: err });
    } else {   
      var newFileUploaded = {
        description: req.body.description,
        fileLink: s3FileURL + file.originalname,
        creator: req.userId,
        s3_key: params.Key
      };
      var document = new DOCUMENT(newFileUploaded);
      document.save(function(error, newFile) {
        if (error) {
          throw error;
        }
        res.send(newFile);
      });
    }
  });
};

// Route to edit existing record's description field
// Here, I am updating only the description in this mongo record. Hence using the "$set" parameter
export const updateDocument = (req, res, next) => {
  DOCUMENT.findByIdAndUpdate(
    req.params.id,
    { $set: { description: Object.keys(req.body)[0] } },
    { new: true },
    (err, updateDoc) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(updateDoc);
    }
  );
};

// Router to delete a DOCUMENT file
export const deleteDocument = (req, res, next) => {
  DOCUMENT.findByIdAndRemove(req.params.id, (err, result) => {
    if (err) {
      return next(err);
    }
    //Now Delete the file from AWS-S3
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteObject-property
    let s3bucket = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });

    let params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: result.s3_key
    };

    s3bucket.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          status: "200",
          responseType: "string",
          response: "success"
        });
      }
    });
  });
};

export const likeDocument = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No document with id: ${id}`);
    
    const myDocument = await DOCUMENT.findById(id);

    const index = myDocument.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      myDocument.likes.push(req.userId);
    } else {
      myDocument.likes = myDocument.likes.filter((id) => id !== String(req.userId));
    }
    const updatedDocument = await DOCUMENT.findByIdAndUpdate(id, myDocument, { new: true });
    res.status(200).json(updatedDocument);
}