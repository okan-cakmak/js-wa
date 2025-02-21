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
    <div className='min-h-screen bg-black text-white p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <div className='flex items-center gap-2'>
            <h1 className='text-2xl font-bold'>Applications</h1>
            <span className='text-gray-400'>/</span>
            <span className='text-gray-400'>List</span>
          </div>
          <button
            onClick={() => createApplication({})}
            className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2'
          >
            <span className='text-xl'>+</span>
            New application
          </button>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-3 gap-4 mb-8'>
          <div className='bg-gray-900 rounded-lg p-6'>
            <h3 className='text-gray-400 mb-2'>Total Applications</h3>
            <p className='text-4xl font-bold'>{totalApps}</p>
          </div>
          <div className='bg-gray-900 rounded-lg p-6'>
            <h3 className='text-gray-400 mb-2'>Active Applications</h3>
            <p className='text-4xl font-bold'>{activeApps}</p>
          </div>
          <div className='bg-gray-900 rounded-lg p-6'>
            <h3 className='text-gray-400 mb-2'>Inactive Applications</h3>
            <p className='text-4xl font-bold'>{inactiveApps}</p>
          </div>
        </div>

        {/* Filters */}
        <div className='flex items-center gap-4 mb-6'>
          <div className='flex bg-gray-800 rounded-lg p-1'>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md ${
                filter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-md ${
                filter === 'active'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('inactive')}
              className={`px-4 py-2 rounded-md ${
                filter === 'inactive'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:text-white'
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
              className='w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600'
            />
          </div>
        </div>

        {/* Applications List */}
        {filteredApps.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-12 bg-gray-900 rounded-lg'>
            <div className='text-4xl mb-4'>✕</div>
            <p className='text-gray-400'>No applications</p>
          </div>
        ) : (
          <div className='bg-gray-900 rounded-lg overflow-hidden'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-gray-800'>
                  <th className='text-left p-4 text-gray-400'>Name</th>
                  <th className='text-left p-4 text-gray-400'>Description</th>
                  <th className='text-left p-4 text-gray-400'>Status</th>
                  <th className='text-left p-4 text-gray-400'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map((app) => (
                  <tr key={app.id} className='border-b border-gray-800'>
                    <td className='p-4'>{app.name}</td>
                    <td className='p-4 text-gray-400'>{app.description}</td>
                    <td className='p-4'>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          app.enabled
                            ? 'bg-green-900 text-green-400'
                            : 'bg-red-900 text-red-400'
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
                        className='text-gray-400 hover:text-white'
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
    </div>
  )
} 