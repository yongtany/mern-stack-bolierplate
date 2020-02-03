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
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'video/mp4') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploader = multer({ 
  storage: storage,
  limits : {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter 
}).single("file");


export function upload(req: Request, res: Response) {
  uploader(req, res, err => {
    if (err) {
        return res.json({ success: false, err });
    }
    return res.json({ success: true, url: req.file.path, fileName: req.file.filename });
  });
}

export function createPost(req: Request, res: Response) {
  const post = new Post(req.body);

  post.save((err, postInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, postInfo })
  })
}

