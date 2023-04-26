import { ActionConfigurationBuilder } from "@/components/grid/actionConfigurationBuilder";

type PropertyExtractor<T, U> = (item: T) => U;

export type CellRenderer = "text" | "boolean" | "date" | "actions";

export type GridConfiguration<T> = Record<string, ColumnConfiguration<T>>;

type ColumnConfiguration<T> = {
  extractor: PropertyExtractor<T, any>;
  renderer: {
    type: CellRenderer;
    meta?: Record<string, any>;
  };
};

export class GridConfigurationBuilder<T extends object> {
  private _gridConfiguration: GridConfiguration<T> = {};
  private readonly actionsHeaderKey = "actions";

  addTextColumn(columnHeader: string, extractor: PropertyExtractor<T, string>) {
    this._gridConfiguration[columnHeader] = {
      extractor,
      renderer: {
        type: "text",
      },
    };

    return this;
  }

  addBooleanColumn(
    columnHeader: string,
    extractor: PropertyExtractor<T, boolean>
  ) {
    this._gridConfiguration[columnHeader] = {
      extractor,
      renderer: {
        type: "boolean",
      },
    };

    return this;
  }

  addDateColumn(columnHeader: string, extractor: PropertyExtractor<T, Date>) {
    this._gridConfiguration[columnHeader] = {
      extractor,
      renderer: {
        type: "date",
      },
    };

    return this;
  }

  addActionsColumn(builder: (builder: ActionConfigurationBuilder<T>) => void) {
    const actionsConfigurationBuilder = new ActionConfigurationBuilder();
    builder(actionsConfigurationBuilder);

    this._gridConfiguration[this.actionsHeaderKey] = {
      extractor: () => undefined,
      renderer: {
        type: "actions",
        meta: {
          actions: actionsConfigurationBuilder.build(),
        },
      },
    };

    return this;
  }

  build() {
    return this._gridConfiguration;
  }
}
