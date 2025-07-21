//Use to define the column titles for a data table model
type ColumnConfig<T> = {
  key: keyof T;
  label: string;
};

//Encapsulates the data and column configuration for a data table model
type DataTableModel<T> = {
  data: T[];
  columns: ColumnConfig<T>[];
};

export type { DataTableModel };
