import { useParams } from 'react-router-dom';
import { useQuery } from 'wasp/client/operations';
import { getApplication } from 'wasp/client/operations';
import { Link } from 'react-router-dom';
import { routes } from 'wasp/client/router';

export function AppDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: app, isLoading, error } = useQuery(getApplication, { id: id || '' });

  if (!id) {
    return (
      <div className='min-h-screen bg-gray-50 dark:bg-boxdark-2 p-4 md:p-6 2xl:p-10'>
        <div className='flex items-center gap-2 mb-6'>
          <Link 
            to={routes.ApplicationsPageRoute.to}
            className='text-primary hover:text-opacity-80'
          >
            ← Back to Applications
          </Link>
        </div>
        <div className='text-red-500'>Error: Invalid application ID</div>
      </div>
    );
  }

  if (isLoading) return (
    <div className='min-h-screen bg-gray-50 dark:bg-boxdark-2 p-4 md:p-6 2xl:p-10'>
      <div className='flex items-center gap-2 mb-6'>
        <Link 
          to={routes.ApplicationsPageRoute.to}
          className='text-primary hover:text-opacity-80'
        >
          ← Back to Applications
        </Link>
      </div>
      <div>Loading...</div>
    </div>
  );

  if (error) return (
    <div className='min-h-screen bg-gray-50 dark:bg-boxdark-2 p-4 md:p-6 2xl:p-10'>
      <div className='flex items-center gap-2 mb-6'>
        <Link 
          to={routes.ApplicationsPageRoute.to}
          className='text-primary hover:text-opacity-80'
        >
          ← Back to Applications
        </Link>
      </div>
      <div className='text-red-500'>Error: {error.message}</div>
    </div>
  );

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-boxdark-2 p-4 md:p-6 2xl:p-10'>
      <div className='flex items-center gap-2 mb-6'>
        <Link 
          to={routes.ApplicationsPageRoute.to}
          className='text-primary hover:text-opacity-80'
        >
          ← Back to Applications
        </Link>
      </div>

      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-black dark:text-white'>{app.name}</h1>
        {app.description && (
          <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>{app.description}</p>
        )}
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5'>
        {/* App ID */}
        <div className='rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark'>
          <h2 className='text-lg font-semibold text-black dark:text-white mb-2'>App ID</h2>
          <div className='bg-gray-100 dark:bg-boxdark-2 p-3 rounded-sm font-mono text-sm break-all'>
            {app.id}
          </div>
        </div>

        {/* Connection Limit */}
        <div className='rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark'>
          <h2 className='text-lg font-semibold text-black dark:text-white mb-2'>Connection Limit</h2>
          <div className='bg-gray-100 dark:bg-boxdark-2 p-3 rounded-sm'>
            {app.maxConnections.toLocaleString()} connections
          </div>
        </div>

        {/* Status */}
        <div className='rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark'>
          <h2 className='text-lg font-semibold text-black dark:text-white mb-2'>Status</h2>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              app.enabled
                ? 'bg-success bg-opacity-10 text-success'
                : 'bg-danger bg-opacity-10 text-danger'
            }`}
          >
            {app.enabled ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* API Keys */}
        <div className='rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark'>
          <h2 className='text-lg font-semibold text-black dark:text-white mb-2'>App Key</h2>
          <div className='bg-gray-100 dark:bg-boxdark-2 p-3 rounded-sm font-mono text-sm break-all'>
            {app.key}
          </div>
        </div>

        <div className='rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark'>
          <h2 className='text-lg font-semibold text-black dark:text-white mb-2'>App Secret</h2>
          <div className='bg-gray-100 dark:bg-boxdark-2 p-3 rounded-sm font-mono text-sm break-all'>
            {app.secret}
          </div>
        </div>
      </div>

      {/* Rate Limits Section */}
      <div className='mt-8'>
        <h2 className='text-xl font-semibold text-black dark:text-white mb-4'>Rate Limits & Quotas</h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5'>
          <div className='rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark'>
            <h3 className='text-md font-semibold text-black dark:text-white mb-2'>Backend Events</h3>
            <div className='bg-gray-100 dark:bg-boxdark-2 p-3 rounded-sm'>
              {app.maxBackendEventsPerSec} per second
            </div>
          </div>

          <div className='rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark'>
            <h3 className='text-md font-semibold text-black dark:text-white mb-2'>Client Events</h3>
            <div className='bg-gray-100 dark:bg-boxdark-2 p-3 rounded-sm'>
              {app.maxClientEventsPerSec} per second
            </div>
          </div>

          <div className='rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark'>
            <h3 className='text-md font-semibold text-black dark:text-white mb-2'>Read Requests</h3>
            <div className='bg-gray-100 dark:bg-boxdark-2 p-3 rounded-sm'>
              {app.maxReadReqPerSec} per second
            </div>
          </div>

          {app.maxEventPayloadInKb && (
            <div className='rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark'>
              <h3 className='text-md font-semibold text-black dark:text-white mb-2'>Max Payload Size</h3>
              <div className='bg-gray-100 dark:bg-boxdark-2 p-3 rounded-sm'>
                {app.maxEventPayloadInKb} KB
              </div>
            </div>
          )}

          {app.maxPresenceMembersPerChannel && (
            <div className='rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark'>
              <h3 className='text-md font-semibold text-black dark:text-white mb-2'>Max Presence Members</h3>
              <div className='bg-gray-100 dark:bg-boxdark-2 p-3 rounded-sm'>
                {app.maxPresenceMembersPerChannel} per channel
              </div>
            </div>
          )}

          {app.maxEventChannelsAtOnce && (
            <div className='rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark'>
              <h3 className='text-md font-semibold text-black dark:text-white mb-2'>Max Event Channels</h3>
              <div className='bg-gray-100 dark:bg-boxdark-2 p-3 rounded-sm'>
                {app.maxEventChannelsAtOnce} at once
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className='mt-8'>
        <h2 className='text-xl font-semibold text-black dark:text-white mb-4'>Features</h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5'>
          <div className='rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark'>
            <h3 className='text-md font-semibold text-black dark:text-white mb-2'>Client Messages</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                app.enableClientMessages
                  ? 'bg-success bg-opacity-10 text-success'
                  : 'bg-danger bg-opacity-10 text-danger'
              }`}
            >
              {app.enableClientMessages ? 'Enabled' : 'Disabled'}
            </span>
          </div>

          <div className='rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark'>
            <h3 className='text-md font-semibold text-black dark:text-white mb-2'>User Authentication</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                app.enableUserAuthentication
                  ? 'bg-success bg-opacity-10 text-success'
                  : 'bg-danger bg-opacity-10 text-danger'
              }`}
            >
              {app.enableUserAuthentication ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
      </div>

      {/* Soketi Metrics Section */}
      <div className='mt-8'>
        <h2 className='text-xl font-semibold text-black dark:text-white mb-4'>Connection Metrics</h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5'>
          {/* Current Connections */}
          <div className='rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark'>
            <h3 className='text-md font-semibold text-black dark:text-white mb-2'>Current Connections</h3>
            <div className='flex items-center'>
              <span className={`px-3 py-1 rounded-full text-sm ${
                app.soketi_connected > 0
                  ? 'bg-success bg-opacity-10 text-success'
                  : 'bg-meta-2 bg-opacity-10 text-meta-2'
              }`}>
                {app.soketi_connected} active
              </span>
            </div>
          </div>

          {/* Total Connections */}
          <div className='rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark'>
            <h3 className='text-md font-semibold text-black dark:text-white mb-2'>Connection History</h3>
            <div className='space-y-2'>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-gray-600 dark:text-gray-400'>New Connections:</span>
                <span className='font-mono'>{app.soketi_new_connections_total}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-gray-600 dark:text-gray-400'>Disconnections:</span>
                <span className='font-mono'>{app.soketi_new_disconnections_total}</span>
              </div>
            </div>
          </div>

          {/* Data Transfer */}
          <div className='rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark'>
            <h3 className='text-md font-semibold text-black dark:text-white mb-2'>Data Transfer</h3>
            <div className='space-y-2'>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-gray-600 dark:text-gray-400'>Received:</span>
                <span className='font-mono'>{app.soketi_socket_received_bytes} bytes</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-gray-600 dark:text-gray-400'>Transmitted:</span>
                <span className='font-mono'>{app.soketi_socket_transmitted_bytes} bytes</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className='rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark'>
            <h3 className='text-md font-semibold text-black dark:text-white mb-2'>Messages</h3>
            <div className='space-y-2'>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-gray-600 dark:text-gray-400'>Received:</span>
                <span className='font-mono'>{app.soketi_ws_messages_received_total}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-gray-600 dark:text-gray-400'>Sent:</span>
                <span className='font-mono'>{app.soketi_ws_messages_sent_total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 