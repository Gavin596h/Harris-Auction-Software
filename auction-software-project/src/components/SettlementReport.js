import React from "react"


const SettlementReport = React.forwardRef((props, ref) => {
    return(
        <div className="p-7 font-fira h-screen" ref={ref}>
        <h2 className='text-black'>Test Auction</h2>
        <p>April 1, 2024</p>
        <table className="w-full text-sm text-black table-auto right-0">
            <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:text-white">
                <tr>
                    <th scope="col" className="px-6 py-3 border-r-2 border-gray-400 ">
                        Bidder Number
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
             
    
                    </tbody>
            </table>
        </div>
      )
})

export default SettlementReport;