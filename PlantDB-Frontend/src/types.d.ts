export const enum PlantDataType {
    String,
    Int,
    Decimal,
    Enum
}

type TitleText = {
    title: string;
    text: string;
}

type PlantApiInfo = {
    path: string;
    imgSrc?: string;
}

type PlantInfo = {
    schema: PlantProperty[];
    records: PlantRecord[][];
    totalCount: number;
}

type PlantRecord = {
    propertyName: string;
    value?: unknown;
}

type DropdownOption = {
    name: string;
    value: unknown;
}

type PlantProperty = {
    propertyName: string;
    displayName: string;
    type: PlantDataType;
    options?: DropdownOption[];
    isRequired: boolean;
    isKey: boolean;
    isIdentifier: boolean;
    isHidden: boolean;
}