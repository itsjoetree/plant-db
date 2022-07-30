export const enum PlantDataType {
    String,
    Int,
    Decimal,
    Enum
}

export type PlantInfo = {
    schema: PlantProperty[],
    records: PlantRecord[][],
    totalCount: number,
}
export type PlantRecord = {
    propertyName: string,
    value: any,
}

export type DropdownOption = {
    name: string,
    value: any,
}

export type PlantProperty = {
    propertyName: string,
    displayName: string,
    type: PlantDataType,
    options?: DropdownOption[],
    isRequired: boolean,
    isKey: boolean,
    isIdentifier: boolean,
    isHidden: boolean,
}