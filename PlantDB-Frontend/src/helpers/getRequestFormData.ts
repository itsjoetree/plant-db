import type { PlantProperty, PlantRecord } from "../types";

/**
 * Prepares FromData for server mutations given the current schema.
 */
function getRequestFormData(plantRecords: PlantRecord[], schema: PlantProperty[], removeImage?: boolean) {
  const formData = new FormData();

  const imageSchema = schema.find(p => p.isImage);

  if (removeImage)
    formData.set("RemoveImage", "true");
  else if (imageSchema) {
    // Images are not primitive values, so they must be handled separately.
    const imageRecord = plantRecords.find(r => r.propertyName === imageSchema?.propertyName);
    if (imageRecord?.value && imageRecord.value instanceof File)
      formData.set("Image", imageRecord.value);
  }

  const records = plantRecords.filter(r => r.propertyName !== imageSchema?.propertyName);
  records.forEach((r, i) => {
    formData.set(`Records[${i}].PropertyName`, r.propertyName?.toString());
    formData.set(`Records[${i}].Value`, r.value?.toString()!);
  });

  return formData;
}

export default getRequestFormData;