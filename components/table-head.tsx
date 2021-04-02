const TableHead = () => {
  return (
    <thead className="font-bold leading-normal">
      <tr>
        <th className="w-1/6 py-5"></th>
        <th className="w-1/4">Názov produktu</th>
        <th className="w-1/6">Hodnotené</th>
        <th className="w-1/6">Avg cena</th>
        <th className="w">Hodnotenie</th>
        <th className="w-2/6 pl-8 pr-3.6 text-right">Súvisiace akcie</th>
      </tr>
    </thead>
  );
};

export default TableHead;
