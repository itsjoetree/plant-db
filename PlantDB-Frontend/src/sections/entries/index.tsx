import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { atom, useAtom } from "jotai";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import Table, { type TableColumn } from "../../components/Table";
import { css } from "../../../styled-system/css";
import type { PlantInfo } from "../../types";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import Button from "../../components/Button";
import getKey from "../../helpers/getKey";
import Container from "../../components/Container";
import { vstack } from "../../../styled-system/patterns";

// Number of records to display per page, ideally this would be dynamic on resize.
const pageSize = 5;

// Used to preserve page number when navigating back to this page.
const pageIndexAtom = atom(0);
const previousSpeciesAtom = atom<string | undefined>(undefined);

function Entries() {
  const { t } = useTranslation("entries");
  const navigate = useNavigate();
  const { species } = useParams();
  const [pageIndex, setPageIndex] = useAtom(pageIndexAtom);
  const [prevSpecies, setPrevSpecies] = useAtom(previousSpeciesAtom);

  const { data: plantInfo } = useQuery(["entries", species, "index", pageIndex], async (): Promise<PlantInfo> => {
    const response = await fetch(`/api/${species}?skip=${Math.abs(pageIndex * pageSize)}&top=${pageSize}`);
    return await response.json();
  }, {
    suspense: true,
    keepPreviousData: true
  });

  // Reset page number when species changes.
  useEffect(() => {
    if (prevSpecies && prevSpecies !== species) setPageIndex(0);

    return () => {
      setPrevSpecies(species);
    };

  }, [prevSpecies, species, setPrevSpecies, setPageIndex]);

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
      render: row => schema?.options ? schema.options?.find(o => o.value?.toString() === row[schema.propertyName])?.name
        : row[schema.propertyName]
    };
  }) as TableColumn<{[key: string]: unknown}>[];

  if (plantInfo?.totalCount === 0) return <NoEntriesMessage />;

  return (<Container className={css({
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  })}>
    <div className={css({ display: "flex", gap: "1rem", alignItems: "center" })}>
      <h1 className={css({ fontSize: "6xl" })}>
        {t(species?.toLocaleLowerCase() + ".plural")}
      </h1>

      <Button to={`/${species}/add`} className={css({ mt: "1rem" })}>{t("newEntry")}</Button>
    </div>

    <Card style={{overflowX: "auto"}}>
      <Table
        columns={columns}
        rows={getRows()}
        onRowClick={(e) => plantInfo ?
          navigate(`/${species}/${e[getKey(plantInfo)?.propertyName ?? ""]}`) : undefined}
      />
    </Card>

    <div className={css({ marginLeft: "auto" })}>
      <Pagination
        text={t("pagination", {
          current: ((pageIndex + 1) * pageSize) > (plantInfo?.totalCount ?? 0) ?
            plantInfo?.totalCount : (pageIndex + 1) * pageSize,
          total: plantInfo?.totalCount })}
        currentPageIndex={pageIndex}
        onPageIndexChange={setPageIndex}
        totalPages={Math.ceil((plantInfo?.totalCount ?? 0 ) / pageSize)}
      />
    </div>
  </Container>);
}

export default Entries;

/**
 * Screen displayed when there are no entries for the selected species.
 */
function NoEntriesMessage() {
  const { t } = useTranslation("entries");
  const { species } = useParams();

  return (
    <div className={vstack()}>
      <h1 className={css({ fontSize: "6xl" })}>
        {t(species?.toLocaleLowerCase() + ".plural")}
      </h1>

      <p>
        {t("noEntries")}
      </p>

      <Button to={`/${species}/add`} className={css({ mt: "1rem" })}>{t("newEntry")}</Button>
    </div>
  );
}