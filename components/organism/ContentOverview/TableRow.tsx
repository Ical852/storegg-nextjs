import NumberFormat from 'react-number-format'

interface TableRowProps {
    title: string,
    category: string,
    item: number,
    coinName: string,
    price: number,
    status: string,
    img: string
}
export default function TableRow(props: TableRowProps) {
    const {title, category, item, price, status, img, coinName} = props
    return (
        <tr className="align-middle">
            <th scope="row">
                <img className="float-start me-3 mb-lg-0 mb-3 img-table-overview" src={img} alt="game"/>
                <div className="game-title-header">
                    <p className="game-title fw-medium text-start color-palette-1 m-0">{title}</p>
                    <p className="text-xs fw-normal text-start color-palette-2 m-0">{category}</p>
                </div>
            </th>
            <td>
                <p className="fw-medium color-palette-1 m-0">{item} {coinName}</p>
            </td>
            <td>
                <p className="fw-medium text-start color-palette-1 m-0">
                    <NumberFormat
                        value={price}
                        prefix={"Rp. "}
                        displayType="text"
                        thousandSeparator='.'
                        decimalSeparator=','
                    />
                </p>
            </td>
            <td>
                <div>
                    <span className={`float-start icon-status ${status.toLocaleLowerCase()}`}></span>
                    <p className="fw-medium text-start color-palette-1 m-0 position-relative">
                        {status}</p>
                </div>
            </td>
        </tr>
    )
}
