import { RouteLocationRaw } from "vue-router";

type Callback<T, V = any> = ((item: T) => V) | ((item: T) => Promise<V>);

export type Action<T> = {
  name: string;
  routerLocationCallback?: (item: T) => RouteLocationRaw;
  callback?: Callback<T>;
  options?: ActionOptions<T>;
  hrefCallback?: (item: T) => string;
};

type ActionOptions<T> = {
  visible?: Callback<T, boolean>;
};

export class ActionConfigurationBuilder<T extends object> {
  private _actions: Action<T>[] = [];

  addRoutingAction(
    name: string,
    routerLocationCallback: (item: T) => RouteLocationRaw,
    options?: ActionOptions<T>
  ) {
    this._actions.push({
      name,
      routerLocationCallback,
      options,
    });

    return this;
  }

  addHrefAction(
    name: string,
    hrefCallback: (item: T) => string,
    options?: ActionOptions<T>
  ) {
    this._actions.push({
      name,
      hrefCallback,
      options,
    });

    return this;
  }

  addClickAction(
    name: string,
    callback: Callback<T>,
    options?: ActionOptions<T>
  ) {
    this._actions.push({
      name,
      callback,
      options,
    });

    return this;
  }

  build() {
    return this._actions;
  }
}
