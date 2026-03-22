import { useEffect, useState } from "react";

const useSearchFilter = <T>(originalData: T[] | null) => {
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!originalData) {
      return;
    }
    const stringifyObject = originalData.map((el) => JSON.stringify(el));

    const filteredObject = stringifyObject.filter((el) => el.includes(searchText));

    const filtered = filteredObject.map((item) => JSON.parse(item));

    setFilteredData(filtered);
  }, [searchText, originalData]);

  return { filteredData, searchText, setSearchText };
};

export default useSearchFilter;
