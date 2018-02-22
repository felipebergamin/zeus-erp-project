import { Document } from "mongoose";
import { instanceDB } from "../db/initConnection";

interface ILog {
  texto: string;
  level: string;
  usuario?: string;
  objectToken?: string;
  systemOutput?: string;
}

export class LogService {
  public static debug(texto: string, systemOutput?: string) {
    LogService.create({texto, level: "debug", systemOutput});
  }

  public static info(texto: string, usuario: string, objectToken: string) {
    LogService.create({texto, level: "info", usuario, objectToken});
  }

  public static warn(texto: string, usuario: string, objectToken: string) {
    LogService.create({texto, level: "warn", usuario, objectToken});
  }

  public static error(texto: string, systemOutput?: string) {
    LogService.create({texto, level: "error", systemOutput});
  }

  public static async getAll(): Promise<Document[]> {
    const Log = (await instanceDB()).model("Log");
    return await Log.find({}).exec();
  }

  private static async create(logData: ILog) {
    const Log = (await instanceDB()).model("Log");
    Log.create({
      dataHora: new Date(),
      ...logData,
    });
  }
}
