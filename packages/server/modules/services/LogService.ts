import { Document } from "mongoose";
import Log = require("../../db/model/Log");

export class LogService {
  public static debug(texto: string, usuario: string, objectToken: string) {
    LogService.create(texto, "debug", usuario, objectToken);
  }

  public static info(texto: string, usuario: string, objectToken: string) {
    LogService.create(texto, "info", usuario, objectToken);
  }

  public static warn(texto: string, usuario: string, objectToken: string) {
    LogService.create(texto, "warn", usuario, objectToken);
  }

  public static error(texto: string, usuario: string, objectToken: string) {
    LogService.create(texto, "error", usuario, objectToken);
  }

  public static async getAll(): Promise<Document[]> {
    return await Log.find({}).exec();
  }

  private static create(texto: string, level: string, usuario: string, objectToken: string): void {

    Log.create({
      dataHora: new Date(),
      level,
      objectToken,
      texto,
      usuario,
    });
  }
}
