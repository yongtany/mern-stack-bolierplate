import { Request, Response } from 'express';
import HTTPStatus from 'http-status';
import multer from 'multer';

import { Post } from '../models/Post/post.model';

// Multer Storage
// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const fileFilter = (req: Request, file: any, cb: any) => {
  // reject a file
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ 
  storage: storage,
  limits : {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter 
}).single("file");


export function uploadThumbnail(req: Request, res: Response) {
  upload(req, res, err => {
    if (err) {
        return res.json({ success: false, err });
    }
    return res.json({ success: true, url: req.file.path, fileName: req.file.filename });
  });
}

export function createPost(req: Request, res: Response) {
  let post = new Post({ content: req.body.content, writer: req.body.userID });

  post.save((err, postInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, postInfo })
  })
}

