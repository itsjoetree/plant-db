import type { PlantInfo, PlantRecord } from "../types";

/**
 * Searches a PlantInfo object and returns the value of the first identifier
 * it finds.
 * 
 * NOTE: There should only be one identifier per PlantInfo object.
 */
function getIdentifier(plantInfo: PlantInfo): PlantRecord | undefined {
  const propertyName = plantInfo.schema.find(property => property.isIdentifier)?.propertyName;

  if (propertyName) {
    const plantRecord: PlantRecord = {
      propertyName: propertyName,
    };

    plantInfo.records.forEach(row => {
      row.forEach(col => {
        col.propertyName === propertyName && (plantRecord.value = col.value?.toString() || "");
      });
    });

    return plantRecord;
  }
}

export default getIdentifier;