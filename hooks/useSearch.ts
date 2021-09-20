import { useEffect } from 'react';
import { replaceSpecialChars } from '../utils/replaceSpecialChars';

const useSearch = <T extends unknown>(
  searchTerm: string,
  inputData: Array<T>,
  setFunction: (e) => string,
  isEmpty = true
): void =>
  useEffect(() => {
    if (searchTerm.length >= 3) {
      const results = inputData.filter(
        (item) =>
          replaceSpecialChars(item['name'])
            .toLowerCase()
            .includes(replaceSpecialChars(searchTerm).toLowerCase()) ||
          (item['description'] &&
            replaceSpecialChars(item['description'])
              .toLowerCase()
              .includes(replaceSpecialChars(searchTerm).toLowerCase())) ||
          (item['brand_type'] &&
            replaceSpecialChars(item['brand_type'])
              .toLowerCase()
              .includes(replaceSpecialChars(searchTerm).toLowerCase()))
      );
      if (results.length > 1000) {
        setFunction([]);
      } else {
        setFunction(results);
      }
    } else {
      if (isEmpty) {
        setFunction([]);
      } else {
        setFunction(inputData);
      }
    }
  }, [searchTerm]);

export default useSearch;
