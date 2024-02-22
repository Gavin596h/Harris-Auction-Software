import Table from 'react-bootstrap/Table';

function Grid() {
    return (
        <Table hover>
            <thead>
                <tr>
                    <th classsName="text-3xl font-bold underline">Bidder Number</th>
                    <th>Amount</th>
                    <th>Amount Per Acre</th>
                    <th>Acre Count</th>
                    <th>Tracts</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>#35</td>
                    <td>$ 20000</td>
                    <td>$2000</td>
                    <td>20</td>
                    <td>1, 2</td>
                </tr>
                <tr>
                    <td>#35</td>
                    <td>$ 20000</td>
                    <td>$2000</td>
                    <td>20</td>
                    <td>1, 2</td>
                </tr>
                <tr>
                    <td>#35</td>
                    <td>$ 20000</td>
                    <td>$2000</td>
                    <td>20</td>
                    <td>1, 2</td>
                </tr>
                <tr>
                    <td>#35</td>
                    <td>$ 20000</td>
                    <td>$2000</td>
                    <td>20</td>
                    <td>1, 2</td>
                </tr>
                <tr>
                    <td>#35</td>
                    <td>$ 20000</td>
                    <td>$2000</td>
                    <td>20</td>
                    <td>1, 2</td>
                </tr>
            </tbody>
        </Table>
    );
}

export default Grid;