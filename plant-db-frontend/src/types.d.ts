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
    totalCount: number,
}

type ModelRecord = {
    propertyName: string,
    value: any,
}

type DropdownOption = {
    name: string,
    value: string,
}

type Property = {
    propertyName: string,
    displayName: string,
    type: any,
    dropdown?: DropdownOption[],
    isRequired: boolean,
    isKey: boolean,
    isIdentifier: boolean,
    isHidden: boolean,
}

export {
    DataType,
    DbInfo,
    ModelInfo,
    TableInfo,
    ModelRecord,
    Property
}
