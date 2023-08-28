import type { PlantInfo } from "../types";

/**
 * Searches a PlantInfo object and returns the image URI of the first image
 * record it finds.
 * 
 * NOTE: There should only be one image per PlantInfo object.
 */
function getIdentifier(plantInfo: PlantInfo): string | undefined {
  const propertyName = plantInfo.schema.find(property => property.isImage)?.propertyName;

  if (propertyName) {
    let imgSrc = undefined;

    plantInfo.records.forEach(row => {
      row.forEach(col => {
        col.propertyName === propertyName && (imgSrc = col.value?.toString() || "");
      });
    });

    return imgSrc;
  }
}

export default getIdentifier;