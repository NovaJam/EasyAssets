const Dashboard = () => {
    return (
        <>
        <div className="p-4 text-center">
            <h1 className="text-3xl font-bold">User Dashboard</h1>
        </div>
        <div className="m-7 space-y-6 bg-gray-100 min-h-screen max-w-4xl mx-auto p-6 rounded">

 
          <div className="flex items-center gap-2 mx-auto">
            <input
              type="text"
              placeholder="Search Asset by ID/Name"
              className="flex-grow px-4 py-2 border rounded"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Scan QR</button>
          </div>
    
          <div className="bg-white p-4 rounded shadow">
            <p className="font-semibold">Assigned Asset 1</p>
            <p>Status: Available</p>
            <button className="mt-2 bg-red-500 text-white px-4 py-1 rounded">Report Issue</button>
          </div>
    
          <div className="bg-white p-4 rounded shadow">
            <p className="font-semibold">Assigned Asset 2</p>
            <p>Status: In Use</p>
            <button className="mt-2 bg-red-500 text-white px-4 py-1 rounded">Report Issue</button>
          </div>
    
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold text-lg mb-2">Report Issue</h2>
            <input
              type="text"
              placeholder="Asset Name"
              className="block w-full px-4 py-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Describe the issue"
              className="block w-full px-4 py-2 mb-2 border rounded"
            />
            <div className="flex justify-between">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Go to Report</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded">Submit</button>
            </div>
          </div>
    
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold text-lg mb-4">Asset Detail</h2>
            <p className="font-semibold">Asset Name</p>
            <div className="w-48 h-48 bg-gray-200 flex items-center justify-center mb-4">
                200 x 200
            </div>
            <p>Status: Available</p>
            <div className="mt-2">
              <p className="font-semibold">Maintenance History</p>
              <ul className="list-disc list-inside">
                <li>Maintained on 2023-01-15</li>
                <li>Maintained on 2023-06-20</li>
              </ul>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded">Report Issue</button>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded">Use Asset</button>
            </div>
          </div>
        </div>
        </>
      );
}

export default Dashboard