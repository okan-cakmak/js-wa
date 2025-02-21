import { useState } from 'react'
import { createApplication } from 'wasp/client/operations'

interface CreateApplicationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateApplicationModal({ isOpen, onClose }: CreateApplicationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createApplication(formData)
      setFormData({ name: '' })
      onClose()
    } catch (error) {
      console.error('Error creating application:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50'>
      <div className='bg-white dark:bg-boxdark rounded-lg max-w-md w-full'>
        <div className='px-6 py-4'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>Create application</h2>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-500 dark:hover:text-gray-300'
            >
              <span className='sr-only'>Close</span>
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300'
              >
                App name<span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                placeholder='Enter app name'
              />
            </div>
            <div className='flex justify-end space-x-3 mt-6'>
              <button
                type='button'
                onClick={onClose}
                className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 