import { routes } from 'wasp/client/router';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className='relative pt-14 w-full'>
      <TopGradient />
      <BottomGradient />
      <div className='py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-4xl text-center'>
            <div className='mb-8 flex justify-center'>
              <div className='relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-300 dark:ring-gray-700 dark:hover:ring-gray-600'>
                ⚡ High-Performance WebSockets{' '}
                <a href='#features' className='font-semibold text-yellow-600 dark:text-yellow-500'>
                  <span className='absolute inset-0' aria-hidden='true' />
                  See how it works <span aria-hidden='true'>&rarr;</span>
                </a>
              </div>
            </div>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white'>
              Powerful <span className='text-yellow-600 dark:text-yellow-500'>Real-time</span> Infrastructure
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300'>
              Build scalable real-time applications with JetSocket's battle-tested WebSocket platform. 
              Reliable, fast, and built for production workloads.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Link
                to={routes.SignupRoute.to}
                className='rounded-md bg-yellow-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600'
              >
                Get Started Free
              </Link>
              <a href={routes.DashboardRoute.to} className='text-sm font-semibold leading-6 text-gray-900 dark:text-white'>
                Live Demo <span aria-hidden='true'>→</span>
              </a>
            </div>
          </div>

          {/* Code Preview */}
          <div className='mt-16 flow-root sm:mt-24'>
            <div className='relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 dark:bg-gray-800/50 dark:ring-gray-700'>
              <div className='absolute top-0 right-0 bg-gradient-to-bl from-yellow-600/30 via-transparent w-[200px] h-[200px] rounded-full blur-3xl' />
              <div className='absolute bottom-0 left-0 bg-gradient-to-tr from-yellow-600/30 via-transparent w-[200px] h-[200px] rounded-full blur-3xl' />
              
              {/* Code Editor Look */}
              <div className='rounded-lg bg-gray-900 p-4 dark:bg-gray-950'>
                <div className='flex items-center gap-2 mb-4'>
                  <div className='w-3 h-3 rounded-full bg-red-500' />
                  <div className='w-3 h-3 rounded-full bg-yellow-500' />
                  <div className='w-3 h-3 rounded-full bg-green-500' />
                </div>
                
                <pre className='overflow-x-auto'>
                  <code className='text-sm text-gray-300'>
                    <span className='text-blue-400'>import</span>{' '}
                    <span className='text-yellow-400'>JetSocket</span>{' '}
                    <span className='text-blue-400'>from</span>{' '}
                    <span className='text-green-400'>'jetsocket'</span>;
                    {'\n\n'}
                    <span className='text-purple-400'>const</span>{' '}
                    socket = <span className='text-blue-400'>new</span>{' '}
                    <span className='text-yellow-400'>JetSocket</span>(
                    <span className='text-green-400'>'YOUR_APP_KEY'</span>);
                    {'\n\n'}
                    <span className='text-gray-500'>// Subscribe to real-time updates</span>{'\n'}
                    socket.<span className='text-yellow-400'>subscribe</span>(
                    <span className='text-green-400'>'chat-room'</span>)
                    {'\n  '}.<span className='text-yellow-400'>on</span>(
                    <span className='text-green-400'>'message'</span>,{' '}
                    <span className='text-purple-400'>message</span> {'=>'} {'{'}
                    {'\n    '}console.<span className='text-yellow-400'>log</span>(
                    <span className='text-green-400'>'New message:'</span>,{' '}
                    message);{'\n  '}
                    {'}'});
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
            <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
              <div className='flex flex-col items-center'>
                <dt className='text-base leading-7 text-gray-600 dark:text-gray-400'>Daily Active Users</dt>
                <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white'>1M+</dd>
              </div>
              <div className='flex flex-col items-center'>
                <dt className='text-base leading-7 text-gray-600 dark:text-gray-400'>Messages per Second</dt>
                <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white'>100K+</dd>
              </div>
              <div className='flex flex-col items-center'>
                <dt className='text-base leading-7 text-gray-600 dark:text-gray-400'>Uptime</dt>
                <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white'>99.99%</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopGradient() {
  return (
    <div className='absolute top-0 right-0 -z-10 transform-gpu overflow-hidden blur-3xl' aria-hidden='true'>
      <div
        className='relative aspect-[1020/880] w-[35rem] -translate-y-[5rem] rotate-[30deg] bg-gradient-to-tr from-yellow-600 to-orange-400 opacity-30 dark:opacity-20'
        style={{
          clipPath: 'polygon(74% 44%, 100% 61%, 97% 26%, 85% 0%, 80% 30%, 72% 51%, 60% 63%)',
        }}
      />
    </div>
  );
}

function BottomGradient() {
  return (
    <div className='absolute -z-10 -top-4 transform-gpu overflow-hidden blur-3xl' aria-hidden='true'>
      <div
        className='relative aspect-[1020/880] w-[35rem] -translate-y-[5rem] rotate-[30deg] bg-gradient-to-tr from-amber-600 to-orange-400 opacity-30 dark:opacity-20'
        style={{
          clipPath: 'polygon(74% 44%, 100% 61%, 97% 26%, 85% 0%, 80% 30%, 72% 51%, 60% 63%)',
        }}
      />
    </div>
  );
}