type PropertyExtractor<T, U> = (item: T) => U;

export type CellRenderer = "text" | "boolean";

export type GridConfiguration<T> = Record<string, ColumnConfiguration<T>>;

type ColumnConfiguration<T> = {
  extractor: PropertyExtractor<T, any>;
  cellRenderer: CellRenderer;
};

export class GridConfigurationBuilder<T extends object> {
  private _gridConfiguration: GridConfiguration<T> = {};

  addTextColumn(columnHeader: string, extractor: PropertyExtractor<T, string>) {
    this._gridConfiguration[columnHeader] = {
      extractor,
      cellRenderer: "text",
    };

    return this;
  }

  addBooleanColumn(
    columnHeader: string,
    extractor: PropertyExtractor<T, boolean>
  ) {
    this._gridConfiguration[columnHeader] = {
      extractor,
      cellRenderer: "boolean",
    };

    return this;
  }

  build() {
    return this._gridConfiguration;
  }
}
