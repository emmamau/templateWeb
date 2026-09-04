import { Request, Response } from "express";

export interface Article {
  ref: string;
  titre: string;
  prix: number;
}

export const get = (_req: Request, res: Response): void => {
  const catalogue: Article[] = [
    { ref: "X001", titre: "Linux", prix: 10 },
    { ref: "X002", titre: "Angular", prix: 20 }
  ];

  res.setHeader("Content-Type", "application/json");
  res.send(catalogue);
};

export default { get };
