import { useParams } from "react-router-dom";
import { atom, useAtom } from "jotai";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Table, { type TableColumn } from "../../components/Table";
import { css } from "../../../styled-system/css";
import { centeredStyles } from "../../styles";
import type { PlantInfo } from "../../types";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import Button from "../../components/Button";

// Number of records to display per page, ideally this would be dynamic on resize.
const pageSize = 5;

// Used to preserve page number when navigating back to this page.
const pageNumberAtom = atom(1);

function Entries() {
  const { t } = useTranslation("search");
  const { species } = useParams();
  const [pageIndex, setPageIndex] = useAtom(pageNumberAtom);

  const { data: plantInfo } = useQuery(["plant-info", species, pageIndex], async (): Promise<PlantInfo> => {
    const response = await fetch(`/api/${species}?skip=${Math.abs((pageIndex - 1) * pageSize)}&top=${pageSize}`);
    return await response.json();
  }, {
    suspense: true,
    keepPreviousData: true
  });

  // Reset page number when species changes.
  useEffect(() => { setPageIndex(1); }, [species, setPageIndex]);

  const getRows = () => {
    const rows: {[key: string]: unknown}[] = [];

    plantInfo?.records.forEach(row => {
      const rowObj: {[key: string]: unknown}  = {};

      row.forEach(record => {
        rowObj[record.propertyName] = record.value;
      });

      rows.push(rowObj);
    });

    return rows;
  };

  const columns = plantInfo?.schema.map(schema => {
    return {
      field: schema.propertyName,
      displayName: !schema.isHidden && t("fields." + schema.propertyName),
      hidden: schema.isHidden,
      render: row => row[schema.propertyName]
    };
  }) as TableColumn<{[key: string]: unknown}>[];

  if (plantInfo?.totalCount === 0) return <NoEntriesMessage />;

  return (<div className={css({
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  })}>
    <div className={css({ display: "flex", gap: "1rem", alignItems: "center" })}>
      <h1 className={css({ fontSize: "lg" })}>
        {t(species?.toLocaleLowerCase() + ".plural")}
      </h1>

      <Button>{t("newEntry")}</Button>
    </div>

    <Card style={{overflowX: "auto"}}>
      <Table
        columns={columns}
        rows={getRows()}
        onRowClick={() => console.log("clicked!")}
      />
    </Card>

    <div className={css({ marginLeft: "auto" })}>
      <Pagination
        currentPage={pageIndex}
        onPageChange={setPageIndex}
        totalPages={Math.ceil((plantInfo?.totalCount ?? 0 ) / pageSize)}
      />
    </div>
  </div>);
}

export default Entries;

/**
 * Screen displayed when there are no entries for the selected species.
 */
function NoEntriesMessage() {
  const { t } = useTranslation("search");
  const { species } = useParams();

  return (
    <div className={`${centeredStyles} ${css({flexDirection: "column"})}`}>
      <h1 className={css({ fontSize: "lg" })}>
        {t(species?.toLocaleLowerCase() + ".plural")}
      </h1>

      <p>
        {t("noEntries")}
      </p>

      <Button className={css({ mt: "1rem" })}>{t("newEntry")}</Button>
    </div>
  );
}