import express from "express";
import { Middlewares } from "./middlewares";

export type UserDB = string | Object | Db[];

export interface Db {
  data?: string | DataUrl | Object;
  dataType?: DataType;
  routes: string | string[];
  middlewares?: Middleware | Array<Middleware | undefined>;
  delays?: number | Array<number | undefined>;
  env?: KeyValString;
  isGrouped?: boolean;
}
export interface DataUrl {
  url: string;
  config?: object;
}

export type DataType = "default" | "file" | "url";

export type Middleware = (params: MiddlewareParams) => any;

export interface Config {
  port?: number;
  rootPath?: string;
  env?: string;
  groupings?: KeyValString;
  proxy?: {
    patternMatch: KeyValString;
    exactMatch: KeyValString;
  };
  excludeRoutes?: string | string[] | RoutesMatchList;
  baseUrl?: string;
  middleware?: Middleware | ConfigMiddleware;
  delay?: number | ConfigDelay;
}

export interface RoutesMatchList {
  exactMatch: string | string[];
  patternMatch: string | string[];
}

export interface Valid_RoutesMatchList {
  exactMatch: string[];
  patternMatch: string[];
}

export interface KeyValString {
  [key: string]: string;
}

export interface ConfigMiddleware {
  func: Middleware;
  excludeRoutes?: string[] | Valid_RoutesMatchList;
  override?: boolean;
}

export interface ConfigDelay {
  time: number;
  excludeRoutes?: string[] | Valid_RoutesMatchList;
  override?: boolean;
}

export interface Globals {
  [key: string]: any;
}

export interface MiddlewareParams {
  req: express.Request;
  res: express.Response;
  next: express.NextFunction;
  data: any;
  globals: Globals;
  locals: Locals;
}

export interface Locals {
  data: any;
  dataType: string;
  specificMiddleware: Middlewares;
  commonMiddleware: Middlewares;
  delay: number;
  fileType: FileType;
  urlType: URLType;
}

export interface FileType {
  url: string;
  data?: any;
  extension?: string;
}
export interface URLType {
  url: string;
  params?: object;
  data?: any;
  headers?: object;
}

export interface Injectors {
  middleware?: Middleware;
  delay?: number;
  isGrouped?: boolean;
  routes: string | string[] | Valid_RoutesMatchList;
}

export interface RouteResult {
  routes: string | string[];
  _d_index: number;
  _s_index: number;
  _r_index?: number;
  status: Status;
  error?: string;
}

export interface HAR {
  log: {
    [key: string]: any;
    entries: HarEntry[];
  };
}

export interface HarEntry {
  [key: string]: any;
  _resourceType: string;
  request: {
    [key: string]: any;
    url: string;
  };
  response: {
    [key: string]: any;
    status: number;
    content: {
      [key: string]: any;
      text: string;
    };
  };
}

export type Status = "success" | "failure";

// The Final valid format of data generated by script

export interface Valid_Db {
  _d_index: number; // Default index. added by script
  data: string | DataUrl | Object;
  dataType: DataType;
  routes: string[];
  middlewares: Array<Middleware | undefined>;
  delays: Array<number | undefined>;
  env: KeyValString;
  isGrouped: boolean;
}

export interface Valid_Config {
  port: number;
  rootPath: string;
  env: string;
  groupings: KeyValString;
  proxy: {
    patternMatch: KeyValString;
    exactMatch: KeyValString;
  };
  excludeRoutes: Valid_RoutesMatchList;
  baseUrl: string;
  middleware: Valid_ConfigMiddleware;
  delay: Valid_ConfigDelay;
}

export interface Valid_ConfigMiddleware {
  func: Middleware;
  excludeRoutes: Valid_RoutesMatchList;
  override: boolean;
}

export interface Valid_ConfigDelay {
  time: number;
  excludeRoutes: Valid_RoutesMatchList;
  override: boolean;
}

export interface Valid_Injectors {
  middleware: Middleware | undefined;
  delay: number | undefined;
  routes: Valid_RoutesMatchList;
  isGrouped: boolean;
}
