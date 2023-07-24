import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { atom, useAtom } from "jotai";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import Table, { type TableColumn } from "../../components/Table";
import { css } from "../../../styled-system/css";
import { centeredStyles } from "../../styles";
import type { PlantInfo } from "../../types";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import Button from "../../components/Button";
import getKey from "../../helpers/getKey";
import Container from "../../components/Container";

// Number of records to display per page, ideally this would be dynamic on resize.
const pageSize = 5;

// Used to preserve page number when navigating back to this page.
const pageNumberAtom = atom(1);
const previousSpeciesAtom = atom<string | undefined>(undefined);

function Entries() {
  const { t } = useTranslation("entries");
  const navigate = useNavigate();
  const { species } = useParams();
  const [pageIndex, setPageIndex] = useAtom(pageNumberAtom);
  const [prevSpecies, setPrevSpecies] = useAtom(previousSpeciesAtom);

  const { data: plantInfo } = useQuery(["info", species, pageIndex], async (): Promise<PlantInfo> => {
    const response = await fetch(`/api/${species}?skip=${Math.abs((pageIndex - 1) * pageSize)}&top=${pageSize}`);
    return await response.json();
  }, {
    suspense: true,
    keepPreviousData: true
  });

  // Reset page number when species changes.
  useEffect(() => {
    if (prevSpecies && prevSpecies !== species) setPageIndex(1);

    return () => {
      setPrevSpecies(species);
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevSpecies, species]);

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
        currentPage={pageIndex}
        onPageChange={setPageIndex}
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
    <div className={`${centeredStyles} ${css({flexDirection: "column"})}`}>
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