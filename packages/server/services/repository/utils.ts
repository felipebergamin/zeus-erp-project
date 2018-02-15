import { Request, Response } from "express";
import { Document, DocumentQuery, Model } from "mongoose";

export function normalizeFields(fields: any): string {
  if (typeof fields === "string") {
    return fields.replace(/,/g, " ");
  }

  if (Array.isArray(fields)) {
    return fields.join(" ");
  }
}

export function normalizePopulate(populate: any): string[] {
  if (typeof populate === "string") {
    return populate.split(/,|\s/);
  }

  if (Array.isArray(populate)) {
    return populate;
  }
}
