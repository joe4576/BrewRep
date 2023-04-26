type Callback<T, V = any> = ((item: T) => V) | ((item: T) => Promise<V>);

export type Action<T> = {
  name: string;
  routeNameCallback?: Callback<T>;
  callback?: Callback<T>;
  options?: ActionOptions<T>;
};

type ActionOptions<T> = {
  visible?: Callback<T, boolean>;
};

export class ActionConfigurationBuilder<T extends object> {
  private _actions: Action<T>[] = [];

  addRoutingAction(
    name: string,
    routeNameCallback: Callback<T, string>,
    options?: ActionOptions<T>
  ) {
    this._actions.push({
      name,
      routeNameCallback,
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
