import { Request, Response } from "express";
import { Document, DocumentQuery, Model } from "mongoose";

/**
 * Recebe um request e uma query já inicializada e aplica os valores de
 * seleção de campos e população de documentos externos recebidos na request
 * @param req
 * @param query
 */
export function aplyGetRequestOptionsToQuery(req: Request, query: DocumentQuery<Document|Document[], Document>) {
  const { fields, populate } = req.query;

  if (fields) {
    query.select(fields.replace(/,/g, " "));
  }

  if (populate) {
    query.populate(populate.split(/,|\s/));
  }
}

/**
 * Cria uma query com os valores de busca, seleção de campos e preenchimento de
 * campos nos parâmetros `select` e `populate` da queryString
 * @param req
 * @param model
 * @param queryParser
 */
export function createQueryAndApplyReqOptions(
                  req: Request,
                  model: Model<Document>,
                  queryParser: (query: any) => any = (val) => val) {

  const { fields, populate, ...searchQuery } = req.query;
  const query = model.find(queryParser(searchQuery));

  if (fields) {
    query.select(fields.replace(/,/g, " "));
  }
  if (populate) {
    query.populate(populate.split(/,|\s/));
  }
  return query;
}

export function handleError(err: any, res: Response) {
  if ("name" in err) {
    if (err.name.includes("ValidationError")) {
      return res.status(400).json(err);
    }

    if (err.name.includes("NotFoundError")) {
      return res.status(404).json(err);
    }
  }

  if (err instanceof Error) {
    return res.status(500).json({ message: err.message });
  }

  res.status(500).json({ message: "Ops, ocorreu um erro desconhecido!", stack: err.stack });
}
