import { RequestHandler } from "express";

const invalidParams: RequestHandler = (req, res, next) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(422).json({ message: "The provided id is invalid." });
  }

  next();
};

export default invalidParams;
