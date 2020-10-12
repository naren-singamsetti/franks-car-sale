export function sortArrayOfObjects(data, field): any {
    return data.sort((elementOne, elementTwo) => {
        return elementOne[field] > elementTwo[field] ? 1 : elementTwo[field] > elementOne[field] ? -1 : 0;
    });
}
