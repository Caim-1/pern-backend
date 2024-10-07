import { RequestHandler } from "express";

const notFound: RequestHandler = (req, res, next) => {
  const error: any = new Error("Not Found");
  error.status = 404;
  next(error);
};

export default notFound;
