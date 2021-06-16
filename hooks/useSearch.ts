import { useEffect } from "react";

const useSearch = (searchTerm, inputData, setFunction, isEmpty=true) => useEffect(() => {
  if (searchTerm.length >= 3) {
    const results = inputData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand_type.toLowerCase().includes(searchTerm.toLowerCase())
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

export default useSearch