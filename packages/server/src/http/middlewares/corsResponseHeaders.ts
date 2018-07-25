import { Request, Response } from "express";

export = (req: Request, res: Response, next: () => void) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'content-type,x-access-token');

  // Pass to next layer of middleware
  next();
};
