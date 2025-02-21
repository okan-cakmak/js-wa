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
      </div>
    </div>
  );
} 