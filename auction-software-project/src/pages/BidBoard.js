import React from 'react';

function BidBoard() {

  return (
    <div className="w-full flex relative overflow-x-auto p-4 sm:ml-64 bg-black ">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-white">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-white">
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
  );
}

export default BidBoard;
