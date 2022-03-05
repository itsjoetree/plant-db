type DbInfo = {
    name: string,
    displayName: string,
}

type ModelInfo = {
    schema: Property[],
    records: ModelRecord[],
}

type TableInfo = {
    schema: Property[],
    rows: ModelRecord[][],
}

type ModelRecord = {
    propertyName: string,
    value: any,
}

type Property = {
    propertyName: string,
    displayName: string,
    type: any,
    isRequired: boolean,
}

export {
    DataType,
    DbInfo,
    ModelInfo,
    TableInfo,
    ModelRecord,
    Property
}
