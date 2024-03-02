import React from 'react';

function BidBoard() {

  return (
    <div>
        <div className="relative overflow-x-auto mr-64">
            <table className="w-full -mr-64 ml-64 fixed text-sm text-gray-500 dark:text-white table-auto">
                <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Bidder
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Bid Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            To Lead
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Per Acre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            High
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tract
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className=" dark:bg-black">
                        <th scope="row" className="px-6 py-4 font-medium text-white-200 whitespace-nowrap dark:text-white">
                            Owen
                        </th>
                        <td className="px-6 py-4">
                            $1
                        </td>
                        <td class="px-6 py-4">
                            $5
                        </td>
                        <td className="px-6 py-4">
                            $0.75
                        </td>
                        <td className="px-6 py-4">
                            $1
                        </td>
                        <td className="px-6 py-4">
                            5
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  );
}

export default BidBoard;
