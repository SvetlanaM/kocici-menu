import Link from 'next/link';

const TableFooter = () => {
  return (
    <tfoot>
      <tr>
        <td className="py-5 pl-3.6 base-medium-text" colSpan={5}>
          <Link href="/">
            <a>+ Pridať hodnotenie nového produktu</a>
          </Link>
        </td>
        <td className="pr-3.6 text-sm font-light text-gray text-right">
          <Link href="/">
            <a>Zobraziť všetky</a>
          </Link>
        </td>
      </tr>
    </tfoot>
  );
};

export default TableFooter;
