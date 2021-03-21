import Image from 'next/image';

const TableRow = ({ items }) => {
  return (
    <tr>
      {/* tu bude nejaky map alebo mozno este niekde inde */}
      {/*<td>{items.image}</td>*/}
      {/*<td>{items.title}</td>*/}
      {/*<td>{items.datetime}</td>*/}
      {/*<td>{items.price}</td>*/}
      {/*<td>{items.star}</td>*/}
      <td className="pl-3.6 py-4">
        <Image
          src="/food/catessy.png"
          alt="Catessy"
          width={55}
          height={55}
          quality={100}
        />
      </td>
      <td>
        <span className="text-base font-medium">Catessy</span>
        <br />
        Kachna a jehněci
      </td>
      <td>
        Pred
        <br />2 dňami
      </td>
      <td>
        235 CZK
        <br />
        na kg
      </td>
      <td className="text-center">
        7
        <br />z 10
      </td>
      <td className="pr-3.6">
        <div className="flex justify-end">
          <div className="mr-3">
            <Image src="/icons/related_products.svg" width={35} height={35} />
          </div>
          <div>
            <Image
              src="/icons/change_stars.svg"
              width={35}
              height={35}
              className="ml-40"
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
