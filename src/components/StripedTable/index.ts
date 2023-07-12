export const rowClassName = (record: any, index: number): string => {
    return index % 2 === 1 ? "table-row-striped" : "";
  };