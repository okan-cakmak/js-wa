import { useState, useEffect } from 'react'
import { createWebsocketApp, useQuery, getAllWebsocketAppsByUser, deleteWebsocketApp } from 'wasp/client/operations'
import { FiPlus, FiTrash2, FiKey, FiCopy, FiCheck } from 'react-icons/fi'

const WebsocketAppPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isKeysModalOpen, setIsKeysModalOpen] = useState(false)
  const [selectedApp, setSelectedApp] = useState(null)
  const [copiedField, setCopiedField] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  const { data: apps, isLoading, error } = useQuery(getAllWebsocketAppsByUser)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createWebsocketApp(formData)
      setIsModalOpen(false)
      setFormData({
        name: '',
        description: ''
      })
    } catch (error) {
      console.error('Error creating websocket app:', error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this app?')) {
      try {
        await deleteWebsocketApp({ id })
      } catch (error) {
        console.error('Error deleting websocket app:', error)
      }
    }
  }

  const handleViewKeys = (app) => {
    setSelectedApp(app)
    setIsKeysModalOpen(true)
  }

  const handleCopyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  if (isLoading) return <div className='p-4'>Loading...</div>
  if (error) return <div className='p-4 text-red-500'>Error: {error.message}</div>

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>Your Apps</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          >
            <FiPlus className='-ml-1 mr-2 h-5 w-5' />
            Create New App
          </button>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {apps?.map((app) => (
            <div
              key={app.id}
              className='bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg'
            >
              <div className='p-5'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-lg font-medium text-gray-900 dark:text-white'>{app.name}</h3>
                  <button
                    className='text-gray-400 hover:text-red-500'
                    onClick={() => handleDelete(app.id)}
                  >
                    <FiTrash2 className='h-5 w-5' />
                  </button>
                </div>
                <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>{app.description}</p>
                <div className='mt-4'>
                  <button
                    className='inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500'
                    onClick={() => handleViewKeys(app)}
                  >
                    <FiKey className='mr-1 h-4 w-4' />
                    View Keys
                  </button>
                </div>
              </div>
              <div className='bg-gray-50 dark:bg-gray-700 px-5 py-3'>
                <div className='text-sm'>
                  <span className='text-gray-500 dark:text-gray-400'>Created on </span>
                  <span className='text-gray-900 dark:text-white'>{new Date(app.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create App Modal */}
        {isModalOpen && (
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4'>
            <div className='bg-white dark:bg-gray-800 rounded-lg max-w-md w-full'>
              <div className='px-6 py-4'>
                <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>Create New App</h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Name</label>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Description</label>
                    <textarea
                      name='description'
                      value={formData.description}
                      onChange={handleChange}
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                      rows={4}
                      required
                    />
                  </div>
                  <div className='flex justify-end space-x-3 mt-6'>
                    <button
                      type='button'
                      onClick={() => setIsModalOpen(false)}
                      className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                      Create App
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* View Keys Modal */}
        {isKeysModalOpen && selectedApp && (
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4'>
            <div className='bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full'>
              <div className='px-6 py-4'>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>App Credentials</h2>
                  <button
                    onClick={() => setIsKeysModalOpen(false)}
                    className='text-gray-400 hover:text-gray-500'
                  >
                    <span className='sr-only'>Close</span>
                    ×
                  </button>
                </div>
                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>App ID</label>
                    <div className='flex items-center space-x-2'>
                      <code className='flex-1 block p-2 text-sm bg-gray-100 dark:bg-gray-700 rounded'>
                        {selectedApp.id}
                      </code>
                      <button
                        onClick={() => handleCopyToClipboard(selectedApp.id, 'id')}
                        className='p-2 text-gray-400 hover:text-gray-500'
                      >
                        {copiedField === 'id' ? <FiCheck className='h-5 w-5 text-green-500' /> : <FiCopy className='h-5 w-5' />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>App Key</label>
                    <div className='flex items-center space-x-2'>
                      <code className='flex-1 block p-2 text-sm bg-gray-100 dark:bg-gray-700 rounded'>
                        {selectedApp.key}
                      </code>
                      <button
                        onClick={() => handleCopyToClipboard(selectedApp.key, 'key')}
                        className='p-2 text-gray-400 hover:text-gray-500'
                      >
                        {copiedField === 'key' ? <FiCheck className='h-5 w-5 text-green-500' /> : <FiCopy className='h-5 w-5' />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>App Secret</label>
                    <div className='flex items-center space-x-2'>
                      <code className='flex-1 block p-2 text-sm bg-gray-100 dark:bg-gray-700 rounded'>
                        {selectedApp.secret}
                      </code>
                      <button
                        onClick={() => handleCopyToClipboard(selectedApp.secret, 'secret')}
                        className='p-2 text-gray-400 hover:text-gray-500'
                      >
                        {copiedField === 'secret' ? <FiCheck className='h-5 w-5 text-green-500' /> : <FiCopy className='h-5 w-5' />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className='mt-6'>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Keep these credentials secure. Never share your App Secret with anyone or commit it to version control.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WebsocketAppPage
