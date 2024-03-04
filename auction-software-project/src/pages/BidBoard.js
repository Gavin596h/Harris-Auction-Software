import React from 'react';
import NewBid from '../components/NewBid';

function BidBoard() {

  return (
         <div class="p-4 sm:ml-64 font-fira ">
            <table className="w-full text-sm text-gray-500 dark:text-white table-auto right-0">
                <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3 border-r-2 border-gray-400 ">
                            Bidder
                        </th>
                        <th scope="col" className="px-6 py-3 border-r-2 border-gray-400">
                            Bid Amount
                        </th>
                        <th scope="col" className="px-6 py-3 border-r-2 border-gray-400">
                            To Lead
                        </th>
                        <th scope="col" className="px-6 py-3 border-r-2 border-gray-400">
                            Per Acre
                        </th>
                        <th scope="col" className="px-6 py-3 border-r-2 border-gray-400">
                            High
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tract
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className=" dark:bg-black">
                        <th scope="row" className="border-gray-400 border-r-2 px-6 py-4 font-medium text-white-200 whitespace-nowrap dark:text-white">
                            Hello
                        </th>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $1
                        </td>
                        <td class="border-gray-400 border-r-2 px-6 py-4">
                            $5
                        </td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $0.75
                        </td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $1
                        </td>
                        <td className=" border-gray-400 border-r-2 px-6 py-4">
                            <span className='bg-blue-700 p-2 m-2'>1</span>
                            <span className='bg-green-700 p-2 m-2'>2</span>
                        </td>
                    </tr>
                    <tr className=" dark:bg-black">
                        <th scope="row" className="border-gray-400 border-r-2 px-6 py-4 font-medium text-white-200 whitespace-nowrap dark:text-white">
                            Hello
                        </th>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $1
                        </td>
                        <td class="border-gray-400 border-r-2 px-6 py-4">
                            $5
                        </td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $0.75
                        </td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $1
                        </td>
                        <td className=" border-gray-400 border-r-2 px-6 py-4">
                            <span className='bg-blue-700 p-2 m-2'>3</span>
                            <span className='bg-green-700 p-2 m-2'>4</span>
                            <span className='bg-purple-700 p-2 m-2'>5</span>
                        </td>
                    </tr>
                    <tr className=" dark:bg-black">
                        <th scope="row" className="border-gray-400 border-r-2 px-6 py-4 font-medium text-white-200 whitespace-nowrap dark:text-white">
                            Hello
                        </th>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $1
                        </td>
                        <td class="border-gray-400 border-r-2 px-6 py-4">
                            $5
                        </td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $0.75
                        </td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $1
                        </td>
                        <td className=" border-gray-400 border-r-2 px-6 py-4">
                            <span className='bg-blue-700 p-2 m-2'>7</span>
                        </td>
                    </tr>
                    <tr className=" dark:bg-black">
                        <th scope="row" className="border-gray-400 border-r-2 px-6 py-4 font-medium text-white-200 whitespace-nowrap dark:text-white">
                            Hello
                        </th>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $1
                        </td>
                        <td class="border-gray-400 border-r-2 px-6 py-4">
                            $5
                        </td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $0.75
                        </td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $1
                        </td>
                        <td className=" border-gray-400 border-r-2 px-6 py-4">
                            <span className='bg-blue-700 p-2 m-2'>8</span>
                            <span className='bg-green-700 p-2 m-2'>9</span>
                        </td>
                    </tr>
                    <tr className=" dark:bg-black">
                        <th scope="row" className="border-gray-400 border-r-2 px-6 py-4 font-medium text-white-200 whitespace-nowrap dark:text-white">
                            Hello
                        </th>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $1
                        </td>
                        <td class="border-gray-400 border-r-2 px-6 py-4">
                            $5
                        </td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $0.75
                        </td>
                        <td className="border-gray-400 border-r-2 px-6 py-4">
                            $1
                        </td>
                        <td className=" border-gray-400 border-r-2 px-6 py-4">
                            <span className='bg-blue-700 p-2 m-2'>10</span>
                        </td>
                    </tr>

                </tbody>
            </table>
            <NewBid></NewBid>
        </div>
  );
}

export default BidBoard;
