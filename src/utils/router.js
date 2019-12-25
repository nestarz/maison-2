import { pathToRegexp } from "path-to-regexp";

class Router {
  constructor() {
    this.routes = [];
  }
  get(uri, callback) {
    if (!uri || !callback) throw new Error("uri or callback must be given");
    if (typeof uri !== "string")
      throw new TypeError("typeof uri must be a string");
    if (typeof callback !== "function")
      throw new TypeError("typeof callback must be a function");

    this.routes.forEach(route => {
      if (route.uri === uri)
        throw new Error(`the uri ${route.uri} already exists`);
    });

    const route = { uri, callback };
    this.routes.push(route);

    return this;
  }

  init() {
    this.routes.some(route => {
      const regexp = pathToRegexp(route.uri);
      let path = window.location.pathname;
      
      const match = regexp.exec(path);
      if (match) {
        let req = { path };
        return route.callback.call(this, req, match.slice(1));
      }
    });
  }
}

export default Router;