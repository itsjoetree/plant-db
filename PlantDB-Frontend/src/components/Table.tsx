import { type ReactNode } from "react";
import { css } from "styled-system/css";

type TableProps<T> = {
  columns: TableColumn<T>[];
  rows: T[];

  /**
   * Space between columns.
   * 
   * @default "5rem"
   */
  gap?: string | number;

  /**
   * Callback for when row is clicked.
   */
  onRowClick: (row: T) => unknown;
}

export type TableColumn<T> = {
  field: keyof T;
  displayName: string;
  hidden?: boolean;
  flex?: number;
  width?: number | string;
  render: (row: T) => ReactNode;
};

/**
 * Styled table component that uses flexbox to format content.
 */
function Table<T>({ columns, rows, gap, onRowClick }: TableProps<T>) {
  const visibleColumns = columns.filter(column => !column.hidden);

  return (<table className={css({
    borderCollapse: "collapse",
    color: "secondary",
    "& th": {
      whiteSpace: "nowrap",
      textAlign: "left",
      fontWeight: "bold",
      pb: "2",
    },
    "& tr": {
      display: "flex",
      py: "4",
      px: "2",
      gap: gap ?? "5rem"
    },
    "& tbody td": {
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap"
    },
    "& tbody tr": {
      _hover: {
        backgroundColor: "secondary",
        color: "primary",
        cursor: "pointer"
      }
    }})}>
    <thead>
      <tr className={css({ borderBottomColor: "secondary", borderBottomWidth: "0.05rem"})}>
        {
          visibleColumns.map(c => <th className={css({
            flex: c.flex ?? 1,
            width: c.width ?? "5rem"
          })} key={c.field.toString()}>
            {c.displayName}
          </th>)
        }
      </tr>
    </thead>

    <tbody>
      {
        rows.map((row, i) => <tr onClick={() => onRowClick(row)} key={i}>
          {
            visibleColumns.map(vc => <td className={css({
              flex: vc.flex ?? 1,
              width: vc.width ?? "6rem"
            })}
            key={vc.field.toString()}>
              {vc.render(row)}
            </td>)
          }
        </tr>)
      }
    </tbody>
  </table>);
}

export default Table;