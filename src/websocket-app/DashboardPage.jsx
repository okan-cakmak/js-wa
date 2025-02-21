import { useState, useEffect } from 'react';
import { useQuery } from 'wasp/client/operations';
import { getConnectedApps } from 'wasp/client/operations';

export const DashboardPage = () => {
  const [metrics, setMetrics] = useState({
    serverStarted: '3 minutes ago',
    memoryUsage: {
      percentage: 6,
      total: '2.0 GB'
    },
    totalConnections: 0
  });

  const { data: connectedApps, isLoading, error } = useQuery(getConnectedApps);

  // Update total connections when apps data changes
  useEffect(() => {
    if (connectedApps) {
      const total = connectedApps.reduce((sum, app) => sum + app.connections, 0);
      setMetrics(prev => ({
        ...prev,
        totalConnections: total
      }));
    }
  }, [connectedApps]);

  // Simulate real-time updates for memory usage
  useEffect(() => {
    const metricsInterval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        memoryUsage: {
          percentage: Math.min(100, prev.memoryUsage.percentage + Math.random() * 2 - 1),
          total: prev.memoryUsage.total
        }
      }));
    }, 5000);

    return () => clearInterval(metricsInterval);
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-boxdark-2 p-4 md:p-6 2xl:p-10'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-black dark:text-white'>Dashboard</h1>
        <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>Monitor your server metrics in real-time</p>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5'>
        {/* Server Started Card */}
        <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
          <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4'>
            <svg className="fill-primary dark:fill-white" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 0C4.93435 0 0 4.93435 0 11C0 17.0657 4.93435 22 11 22C17.0657 22 22 17.0657 22 11C22 4.93435 17.0657 0 11 0ZM11 20.1818C5.93935 20.1818 1.81818 16.0607 1.81818 11C1.81818 5.93935 5.93935 1.81818 11 1.81818C16.0607 1.81818 20.1818 5.93935 20.1818 11C20.1818 16.0607 16.0607 20.1818 11 20.1818Z"/>
              <path d="M15.8182 10.0909H11.9091V5.27273C11.9091 4.77309 11.4996 4.36364 11 4.36364C10.5004 4.36364 10.0909 4.77309 10.0909 5.27273V11C10.0909 11.4996 10.5004 11.9091 11 11.9091H15.8182C16.3178 11.9091 16.7273 11.4996 16.7273 11C16.7273 10.5004 16.3178 10.0909 15.8182 10.0909Z"/>
            </svg>
          </div>

          <div className='mt-4 flex items-end justify-between'>
            <div>
              <h4 className='text-title-md font-bold text-black dark:text-white'>{metrics.serverStarted}</h4>
              <span className='text-sm font-medium'>Server Started</span>
            </div>
          </div>
        </div>

        {/* Memory Usage Card */}
        <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
          <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4'>
            <svg className="fill-primary dark:fill-white" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.1818 7.27273H1.81818C0.818182 7.27273 0 8.09091 0 9.09091V17.2727C0 18.2727 0.818182 19.0909 1.81818 19.0909H20.1818C21.1818 19.0909 22 18.2727 22 17.2727V9.09091C22 8.09091 21.1818 7.27273 20.1818 7.27273ZM20.1818 17.2727H1.81818V9.09091H20.1818V17.2727Z"/>
              <path d="M20.1818 2.90909H1.81818C0.818182 2.90909 0 3.72727 0 4.72727C0 5.72727 0.818182 6.54545 1.81818 6.54545H20.1818C21.1818 6.54545 22 5.72727 22 4.72727C22 3.72727 21.1818 2.90909 20.1818 2.90909Z"/>
            </svg>
          </div>

          <div className='mt-4 flex items-end justify-between'>
            <div>
              <h4 className='text-title-md font-bold text-black dark:text-white'>{metrics.memoryUsage.percentage}% of {metrics.memoryUsage.total}</h4>
              <span className='text-sm font-medium'>Memory Usage</span>
            </div>
          </div>

          <div className='mt-4 flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700'>
            <div 
              className='flex flex-col justify-center overflow-hidden bg-primary'
              role='progressbar'
              style={{ width: `${metrics.memoryUsage.percentage}%` }}
              aria-valuenow={metrics.memoryUsage.percentage}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        </div>

        {/* Total Connections Card */}
        <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
          <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4'>
            <svg className="fill-primary dark:fill-white" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 11C13.2091 11 15 9.20914 15 7C15 4.79086 13.2091 3 11 3C8.79086 3 7 4.79086 7 7C7 9.20914 8.79086 11 11 11Z"/>
              <path d="M14 13H8C5.79086 13 4 14.7909 4 17V19H18V17C18 14.7909 16.2091 13 14 13Z"/>
            </svg>
          </div>

          <div className='mt-4 flex items-end justify-between'>
            <div>
              <h4 className='text-title-md font-bold text-black dark:text-white'>{metrics.totalConnections}</h4>
              <span className='text-sm font-medium'>Total Open Connections</span>
            </div>
          </div>
        </div>
      </div>

      {/* Connected Apps Section */}
      <div className='mt-6'>
        <div className='mb-4'>
          <h2 className='text-xl font-semibold text-black dark:text-white'>Connected Apps</h2>
          <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>Real-time connection status of your applications</p>
        </div>

        {isLoading ? (
          <div className='rounded-sm border border-stroke bg-white p-10 text-center shadow-default dark:border-strokedark dark:bg-boxdark'>
            <p className='text-black dark:text-white'>Loading...</p>
          </div>
        ) : !connectedApps || connectedApps.length === 0 ? (
          <div className='rounded-sm border border-stroke bg-white p-10 text-center shadow-default dark:border-strokedark dark:bg-boxdark'>
            <p className='text-black dark:text-white'>No connected apps</p>
          </div>
        ) : (
          <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-stroke dark:border-strokedark'>
                  <th className='p-4 text-left font-medium text-black dark:text-white'>App ID</th>
                  <th className='p-4 text-left font-medium text-black dark:text-white'>Name</th>
                  <th className='p-4 text-left font-medium text-black dark:text-white'>Connections</th>
                </tr>
              </thead>
              <tbody>
                {connectedApps.map((app) => (
                  <tr key={app.id} className='border-b border-stroke dark:border-strokedark'>
                    <td className='p-4 text-black dark:text-white'>{app.id}</td>
                    <td className='p-4 text-black dark:text-white'>{app.name}</td>
                    <td className='p-4'>
                      <span className='px-3 py-1 rounded-full text-sm bg-success bg-opacity-10 text-success'>
                        {app.connections} active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}; 