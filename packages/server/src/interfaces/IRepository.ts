export interface IRepository<T> {
  create(data: T|T[]): Promise<T|T[]>;
  get(id: string, options?: { fields?: string, populate?: string }): Promise<T>;
  getAll(searchValues: any, options?: { fields?: string, populate?: string }): Promise<T[]>;
  remove(id: string): Promise<T>;
  update(id: string, data: T): Promise<{ result: T, modifiedPaths: string }>;
}
