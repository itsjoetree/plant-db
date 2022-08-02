import { PlantRecord } from "./types"

export function upperCase(text: string) {
    const splitText = text.split('')
    splitText[0] = text.toUpperCase()[0]

    return splitText.join('')
}

export const getCurrentImage = (records: PlantRecord[] | undefined) => {
    if (records == null) return null
    
    const imageType = records.find(r => r.propertyName === "ImageType")?.value
    const image = records.find(r => r.propertyName === "Image")?.value

    if (imageType != null && image != null) {
        return  `data:${imageType};base64,${image}`
    }

    return null
}