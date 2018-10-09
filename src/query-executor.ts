import axios, { AxiosPromise } from "axios";

export interface IQuery<T> {
  validate(): Promise<void> | void;
  execute(): Promise<T> | T;
}

export abstract class Query {
  protected get<T>(url: string): Promise<T> {
    return axios.get(url).then(result => result.data);
  }
}

function isPromise(arg: any) {
  return typeof arg === "object" && typeof arg.then === "function";
}

class QueryExectutor {
  public async execute<TResult>(query: IQuery<TResult>): Promise<TResult> {
    const validateResult = query.validate();
    if (isPromise(validateResult)) {
      await validateResult;
    }

    const executeResult = query.execute();
    return isPromise(executeResult) ? await executeResult : executeResult;
  }
}

export const queryExecutor = new QueryExectutor();
