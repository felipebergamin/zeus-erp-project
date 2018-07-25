import { Request, Response } from "express";

export = (req: Request, res: Response, next: () => void) => {
  if (req.header('Access-Control-Request-Method') && req.header('Access-Control-Request-Headers')) {
    res.status(200).send();
  } else {
    next();
  }
};
