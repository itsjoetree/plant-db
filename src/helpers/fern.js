const lightingConditionDropdown = [
    {name: 'Bright', value: 'Bright'},
    {name: 'Partial Sun', value: 'PartialSun'},
    {name: 'Low', value: 'Low'}
]

const wateringIntervalDropdown = [
    {name: 'Often', value: 'Often'},
    {name: 'Sometimes', value: 'Sometimes'},
    {name: 'Seldom', value: 'Seldom'}
]
  
// Generates a schema for presenting data on the frontend
function generateSchema() {
    return [
        { propertyName: 'id', type: 'Number', isKey: true, isHidden: true },
        { propertyName: 'name', displayName: 'Name', type: 'String', isIdentifier: true, isRequired: true },
        { propertyName: 'nickname', displayName: 'Nickname', type: 'String', isRequired: false },
        { propertyName: 'description', displayName: 'Description', type: 'String', isRequired: true },
        { propertyName: 'lightingCondition', displayName: 'Lighting Condition', type: 'Dropdown', isRequired: true, dropdown: lightingConditionDropdown },
        { propertyName: 'wateringInterval', displayName: 'Watering Interval', type: 'Dropdown', isRequired: true, dropdown: wateringIntervalDropdown },
        { propertyName: 'avgHeightInches', displayName: 'Avg. Height (IN)', type: 'Number', isRequired: true },
        { propertyName: 'origin', displayName: 'Origin', type: 'String', isRequired: false },
    ]
}
  
// Generates records for presenting data on the frontend
function generateRecords(fern) {
    return [
        { propertyName: 'id', value: fern.id },
        { propertyName: 'name', value: fern.name },
        { propertyName: 'nickname', value: fern.nickname },
        { propertyName: 'description', value: fern.description },
        { propertyName: 'lightingCondition', value: fern.lightingCondition },
        { propertyName: 'wateringInterval', value: fern.wateringInterval },
        { propertyName: 'avgHeightInches', value: fern.avgHeightInches },
        { propertyName: 'origin', value: fern.origin },
    ]
}
  
  // Checks if dropdown values are valid, if there is an error: return true
function checkDropdownsHasError(fern) {
    if (wateringIntervalDropdown.findIndex(d => d.value === fern.wateringInterval) === -1) {
        res.status(409).send('Invalid Watering Interval.')
        return true;
    }

    if (lightingConditionDropdown.findIndex(d => d.value === fern.lightingCondition) === -1) {
        res.status(409).send('Invalid Lighting Condition.')
        return true;
    }
}

export { 
    generateSchema,
    generateRecords,
    checkDropdownsHasError
}