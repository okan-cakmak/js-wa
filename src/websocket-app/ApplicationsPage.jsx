import React, { useState } from 'react'
import { useQuery } from 'wasp/client/operations'
import { getApplications, createApplication, updateApplication } from 'wasp/client/operations'
import { Link } from 'react-router-dom'

export function ApplicationsPage() {
  const { data: applications, isLoading, error } = useQuery(getApplications)
  const [filter, setFilter] = useState('all') // 'all', 'active', 'inactive'
  const [searchTerm, setSearchTerm] = useState('')

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const filteredApps = applications?.filter(app => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'active' && app.enabled) || 
      (filter === 'inactive' && !app.enabled)
    
    const matchesSearch = 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesFilter && matchesSearch
  }) || []

  const totalApps = applications?.length || 0
  const activeApps = applications?.filter(app => app.enabled).length || 0
  const inactiveApps = applications?.filter(app => !app.enabled).length || 0

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-boxdark-2 p-4 md:p-6 2xl:p-10'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-black dark:text-white'>Applications</h1>
        <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>Manage your applications and their status</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 mb-6'>
        <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
          <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4'>
            <svg className="fill-primary dark:fill-white" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 11C13.2091 11 15 9.20914 15 7C15 4.79086 13.2091 3 11 3C8.79086 3 7 4.79086 7 7C7 9.20914 8.79086 11 11 11Z"/>
              <path d="M14 13H8C5.79086 13 4 14.7909 4 17V19H18V17C18 14.7909 16.2091 13 14 13Z"/>
            </svg>
          </div>
          <div className='mt-4 flex items-end justify-between'>
            <div>
              <h4 className='text-title-md font-bold text-black dark:text-white'>{totalApps}</h4>
              <span className='text-sm font-medium'>Total Applications</span>
            </div>
          </div>
        </div>

        <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
          <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4'>
            <svg className="fill-primary dark:fill-white" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 8.5V6.5C20 5.4 19.1 4.5 18 4.5H4C2.9 4.5 2 5.4 2 6.5V8.5H20Z"/>
              <path d="M2 10.5V15.5C2 16.6 2.9 17.5 4 17.5H18C19.1 17.5 20 16.6 20 15.5V10.5H2ZM14 14.5H8C7.45 14.5 7 14.05 7 13.5C7 12.95 7.45 12.5 8 12.5H14C14.55 12.5 15 12.95 15 13.5C15 14.05 14.55 14.5 14 14.5Z"/>
            </svg>
          </div>
          <div className='mt-4 flex items-end justify-between'>
            <div>
              <h4 className='text-title-md font-bold text-black dark:text-white'>{activeApps}</h4>
              <span className='text-sm font-medium'>Active Applications</span>
            </div>
          </div>
        </div>

        <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
          <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4'>
            <svg className="fill-primary dark:fill-white" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 0C4.93435 0 0 4.93435 0 11C0 17.0657 4.93435 22 11 22C17.0657 22 22 17.0657 22 11C22 4.93435 17.0657 0 11 0ZM11 20.1818C5.93935 20.1818 1.81818 16.0607 1.81818 11C1.81818 5.93935 5.93935 1.81818 11 1.81818C16.0607 1.81818 20.1818 5.93935 20.1818 11C20.1818 16.0607 16.0607 20.1818 11 20.1818Z"/>
            </svg>
          </div>
          <div className='mt-4 flex items-end justify-between'>
            <div>
              <h4 className='text-title-md font-bold text-black dark:text-white'>{inactiveApps}</h4>
              <span className='text-sm font-medium'>Inactive Applications</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className='mb-6 flex flex-col md:flex-row gap-4'>
        <div className='flex bg-white dark:bg-boxdark rounded-sm border border-stroke p-1 shadow-default dark:border-strokedark'>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-sm ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-meta-4'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-sm ${
              filter === 'active'
                ? 'bg-primary text-white'
                : 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-meta-4'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('inactive')}
            className={`px-4 py-2 rounded-sm ${
              filter === 'inactive'
                ? 'bg-primary text-white'
                : 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-meta-4'
            }`}
          >
            Inactive
          </button>
        </div>
        <div className='flex-1'>
          <input
            type='text'
            placeholder='Search applications...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full rounded-sm border border-stroke bg-white px-4 py-2 text-black dark:border-strokedark dark:bg-boxdark dark:text-white focus:border-primary focus:outline-none'
          />
        </div>
        <button
          onClick={() => createApplication({})}
          className='bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-sm flex items-center gap-2'
        >
          <span className='text-xl'>+</span>
          New application
        </button>
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <div className='rounded-sm border border-stroke bg-white p-10 text-center shadow-default dark:border-strokedark dark:bg-boxdark'>
          <div className='text-4xl mb-4 text-black dark:text-white'>✕</div>
          <p className='text-black dark:text-white'>No applications found</p>
        </div>
      ) : (
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-stroke dark:border-strokedark'>
                <th className='p-4 text-left font-medium text-black dark:text-white'>Name</th>
                <th className='p-4 text-left font-medium text-black dark:text-white'>Description</th>
                <th className='p-4 text-left font-medium text-black dark:text-white'>Status</th>
                <th className='p-4 text-left font-medium text-black dark:text-white'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((app) => (
                <tr key={app.id} className='border-b border-stroke dark:border-strokedark'>
                  <td className='p-4 text-black dark:text-white'>{app.name}</td>
                  <td className='p-4 text-black dark:text-white'>{app.description}</td>
                  <td className='p-4'>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        app.enabled
                          ? 'bg-success bg-opacity-10 text-success'
                          : 'bg-danger bg-opacity-10 text-danger'
                      }`}
                    >
                      {app.enabled ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className='p-4'>
                    <button
                      onClick={() =>
                        updateApplication({
                          id: app.id,
                          enabled: !app.enabled,
                        })
                      }
                      className='text-primary hover:text-opacity-80'
                    >
                      {app.enabled ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
} 