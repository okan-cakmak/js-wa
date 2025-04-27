import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Icons
import { 
  BoltIcon, 
  CurrencyDollarIcon, 
  ArrowPathIcon, 
  CloudArrowUpIcon,
  CheckIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

type PublishLanguage = 'nodejs';
type SubscribeLanguage = 'javascript' | 'android' | 'ios';

const LandingPage = () => {
  const [publishTab, setPublishTab] = useState<PublishLanguage>('nodejs');
  const [subscribeTab, setSubscribeTab] = useState<SubscribeLanguage>('javascript');

  const publishExamples: Record<PublishLanguage, string> = {
    nodejs: `const jetsocket = new JetSocket('YOUR_APP_KEY', {
  cluster: 'eu',
  encrypted: true
});

jetsocket.trigger('my-channel', 'my-event', {
  message: 'Hello from JetSocket!'
});`
  };

  const subscribeExamples: Record<SubscribeLanguage, string> = {
    javascript: `const jetsocket = new JetSocket('YOUR_APP_KEY', {
  cluster: 'eu',
  encrypted: true
});

const channel = jetsocket.subscribe('my-channel');
channel.bind('my-event', (data) => {
  console.log('Received:', data.message);
});`,
    android: `// Coming soon`,
    ios: `// Coming soon`
  };

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <div className='relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20'>
        <div className='mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40'>
          <div className='mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8'>
            <div className='mt-24 sm:mt-32 lg:mt-16'>
              <a href='#pricing' className='inline-flex space-x-6'>
                <span className='rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10'>
                  Save up to 70% vs Pusher
                </span>
              </a>
            </div>
            <h1 className='mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
              The Cost-Effective Pusher Alternative You've Been Waiting For
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Drop-in  cement for Pusher. Same API, better pricing. Switch in minutes with zero code changes.
            </p>
            <div className='mt-10 flex items-center gap-x-6'>
            <Link
  to="/signup"
  className="
    mt-6            /* gap from the content above */
    mb-4            /* gap from the bottom of the card */
    block
    w-full          /* fill the card’s inner width */
    rounded-full      /* smooth corners */
    bg-[#6366F1]     /* blue background */
    py-3            /* vertical padding */
    text-center
    font-semibold
    text-white
    hover:bg-blue-700
    focus:outline-none focus:ring-2 focus:ring-blue-500
    transition
  "
>
  Get started
</Link>
              <a href='#how-it-works' className='text-sm font-semibold leading-6 text-gray-900'>
                Learn more <span aria-hidden='true'>→</span>
              </a>
            </div>
          </div>
          <div className='mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32'>
            <div className='max-w-3xl flex-none sm:max-w-5xl lg:max-w-none'>
              <div className='rounded-md bg-[#1a1a1a] shadow-2xl ring-1 ring-white/10'>
                {/* Code Examples */}
                <div className='flex flex-col gap-8 p-6'>
                  {/* Publish Example */}
                  <div>
                    <h3 className='text-lg font-semibold mb-4 text-white'>Publish</h3>
                    <div className='bg-[#0d1117] rounded-lg overflow-hidden'>
                      <div className='flex border-b border-gray-800'>
                        <button
                          className='px-4 py-2 text-sm font-medium bg-indigo-600 text-white'
                        >
                          Node.js
                        </button>
                        <div className='px-4 py-2 text-sm font-medium text-gray-400 flex items-center'>
                          <span className='mr-1'>Python</span>
                          <span className='text-xs text-gray-500'>• Coming soon</span>
                        </div>
                        <div className='px-4 py-2 text-sm font-medium text-gray-400 flex items-center'>
                          <span className='mr-1'>Go</span>
                          <span className='text-xs text-gray-500'>• Coming soon</span>
                        </div>
                      </div>
                      <pre className='p-4 text-sm overflow-x-auto'>
                        <code className='text-[#e6edf3] font-mono'>{publishExamples[publishTab]}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Subscribe Example */}
                  <div>
                    <h3 className='text-lg font-semibold mb-4 text-white'>Subscribe</h3>
                    <div className='bg-[#0d1117] rounded-lg overflow-hidden'>
                      <div className='flex border-b border-gray-800'>
                        <button
                          className='px-4 py-2 text-sm font-medium bg-indigo-600 text-white'
                        >
                          JavaScript
                        </button>
                        <div className='px-4 py-2 text-sm font-medium text-gray-400 flex items-center'>
                          <span className='mr-1'>Android</span>
                          <span className='text-xs text-gray-500'>• Coming soon</span>
                        </div>
                        <div className='px-4 py-2 text-sm font-medium text-gray-400 flex items-center'>
                          <span className='mr-1'>iOS</span>
                          <span className='text-xs text-gray-500'>• Coming soon</span>
                        </div>
                      </div>
                      <pre className='p-4 text-sm overflow-x-auto'>
                        <code className='text-[#e6edf3] font-mono'>{subscribeExamples[subscribeTab]}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className='bg-white py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:text-center'>
            <h2 className='text-base font-semibold leading-7 text-indigo-600'>Powerful Features</h2>
            <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Everything you need for real-time applications
            </p>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Built by developers, for developers. Get all the features you love about Pusher, with better pricing and support.
            </p>
          </div>
          <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
            <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
              <div className='flex flex-col'>
                <dt className='flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900'>
                  <BoltIcon className='h-5 w-5 flex-none text-indigo-600' />
                  Lightning-Fast Real-Time
                </dt>
                <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600'>
                  <p className='flex-auto'>
                    Sub-100ms latency worldwide. Built on a globally distributed network for instant message delivery.
                  </p>
                </dd>
              </div>
              <div className='flex flex-col'>
                <dt className='flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900'>
                  <ArrowPathIcon className='h-5 w-5 flex-none text-indigo-600' />
                  Drop-in Replacement
                </dt>
                <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600'>
                  <p className='flex-auto'>
                    100% API compatibility with Pusher. Change your credentials, and you're ready to go.
                  </p>
                </dd>
              </div>
              <div className='flex flex-col'>
                <dt className='flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900'>
                  <CurrencyDollarIcon className='h-5 w-5 flex-none text-indigo-600' />
                  70% Cost Savings
                </dt>
                <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600'>
                  <p className='flex-auto'>
                    Pay significantly less for the same features. Transparent pricing with no hidden costs.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id='how-it-works' className='bg-gray-50 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:text-center'>
            <h2 className='text-base font-semibold leading-7 text-indigo-600'>Simple Integration</h2>
            <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Switch to JetSocket in 3 Steps
            </p>
          </div>
          <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24'>
            <dl className='grid grid-cols-1 gap-y-16 gap-x-8 lg:grid-cols-3'>
              <div className='relative pl-16'>
                <dt className='text-base font-semibold leading-7 text-gray-900'>
                  <div className='absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600'>
                    <span className='text-white'>1</span>
                  </div>
                  Sign Up for JetSocket
                </dt>
                <dd className='mt-2 text-base leading-7 text-gray-600'>
                  Create your account and get your API credentials instantly
                </dd>
              </div>
              <div className='relative pl-16'>
                <dt className='text-base font-semibold leading-7 text-gray-900'>
                  <div className='absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600'>
                    <span className='text-white'>2</span>
                  </div>
                  Update Credentials
                </dt>
                <dd className='mt-2 text-base leading-7 text-gray-600'>
                  Replace your Pusher credentials with JetSocket's - no other changes needed
                </dd>
              </div>
              <div className='relative pl-16'>
                <dt className='text-base font-semibold leading-7 text-gray-900'>
                  <div className='absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600'>
                    <span className='text-white'>3</span>
                  </div>
                  Deploy & Save
                </dt>
                <dd className='mt-2 text-base leading-7 text-gray-600'>
                  Deploy your updated application and start saving immediately
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className='bg-white py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-xl text-center'>
            <h2 className='text-lg font-semibold leading-8 tracking-tight text-indigo-600'>Testimonials</h2>
            <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Loved by Developers
            </p>
          </div>
          <div className='mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none'>
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              <figure className='rounded-2xl bg-gray-50 p-8'>
                <blockquote className='text-gray-600'>
                  "Switching to JetSocket was a no-brainer. Same API, better pricing, and their support is incredible. We're saving $800/month!"
                </blockquote>
                <figcaption className='mt-6 flex items-center gap-x-4'>
                  <div>
                    <div className='font-semibold'>Sarah Chen</div>
                    <div className='text-gray-600'>CTO at TechFlow</div>
                  </div>
                </figcaption>
              </figure>
              <figure className='rounded-2xl bg-gray-50 p-8'>
                <blockquote className='text-gray-600'>
                  "The migration took less than 5 minutes. Just changed the credentials and everything worked perfectly. It's truly a drop-in replacement."
                </blockquote>
                <figcaption className='mt-6 flex items-center gap-x-4'>
                  <div>
                    <div className='font-semibold'>Mark Thompson</div>
                    <div className='text-gray-600'>Lead Developer at StartupX</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id='pricing' className='bg-gray-50 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>Simple, transparent pricing</h2>
            <p className='mt-6 text-base leading-7 text-gray-600'>
              Save up to 70% compared to Pusher. No hidden fees, no surprises.
            </p>
          </div>
          <div className='mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 sm:mt-20 lg:max-w-6xl lg:grid-cols-4'>
            {/* Hobby Plan */}
            <div className='flex flex-col h-full rounded-3xl bg-white px-5 py-8 ring-1 ring-gray-200'>
              <div className='flex-grow'>
                <h3 className='text-xl font-semibold text-gray-900'>Hobby</h3>
                <p className='mt-4 text-sm text-gray-600'>Perfect for small projects and testing</p>
                <div className='mt-6 flex items-baseline'>
                  <span className='text-3xl font-bold tracking-tight text-gray-900'>$0</span>
                  <span className='ml-1 text-sm font-medium text-gray-500'>/month</span>
                </div>
                <ul className='mt-6 space-y-3 list-none marker:content-none'>
                  <li className='flex gap-x-2 before:content-none'>
                    <CheckIcon className='h-5 w-5 flex-shrink-0 text-[#6366F1]' />
                    <span className='text-sm text-gray-600'>100 concurrent connections</span>
                  </li>
                  <li className='flex gap-x-2 before:content-none'>
                    <CheckIcon className='h-5 w-5 flex-shrink-0 text-[#6366F1]' />
                    <span className='text-sm text-gray-600'>200k messages/day</span>
                  </li>
                  <li className='flex gap-x-2 before:content-none'>
                    <CheckIcon className='h-5 w-5 flex-shrink-0 text-[#6366F1]' />
                    <span className='text-sm text-gray-600'>Community support</span>
                  </li>
                </ul>
              </div>
              <Link
  to="/signup"
  className="
    mt-6            /* gap from the content above */
    mb-4            /* gap from the bottom of the card */
    block
    w-full          /* fill the card’s inner width */
    rounded-full      /* smooth corners */
    bg-[#6366F1]     /* blue background */
    py-3            /* vertical padding */
    text-center
    font-semibold
    text-white
    hover:bg-blue-700
    focus:outline-none focus:ring-2 focus:ring-blue-500
    transition
  "
>
  Get started
</Link>

            </div>

            {/* Startup Plan */}
            <div className='flex flex-col h-full relative rounded-3xl bg-white px-5 py-8 ring-2 ring-[#6366F1]'>
              <div className='absolute -top-5 left-1/2 -translate-x-1/2'>
                <span className='inline-flex rounded-full bg-[#6366F1] px-4 py-1 text-xs font-semibold text-white'>
                  Most popular
                </span>
              </div>
              <div className='flex-grow'>
                <h3 className='text-xl font-semibold text-gray-900'>Startup</h3>
                <p className='mt-4 text-sm text-gray-600'>Perfect for growing applications</p>
                <div className='mt-6 flex items-baseline'>
                  <span className='text-3xl font-bold tracking-tight text-gray-900'>$39.99</span>
                  <span className='ml-1 text-sm font-medium text-gray-500'>/month</span>
                </div>
                <ul className='mt-6 space-y-3 list-none marker:content-none'>
                  <li className='flex gap-x-2 before:content-none'>
                    <CheckIcon className='h-5 w-5 flex-shrink-0 text-[#6366F1]' />
                    <span className='text-sm text-gray-600'>1,000 concurrent connections</span>
                  </li>
                  <li className='flex gap-x-2 before:content-none'>
                    <CheckIcon className='h-5 w-5 flex-shrink-0 text-[#6366F1]' />
                    <span className='text-sm text-gray-600'>1M messages/day</span>
                  </li>
                  <li className='flex gap-x-2 before:content-none'>
                    <CheckIcon className='h-5 w-5 flex-shrink-0 text-[#6366F1]' />
                    <span className='text-sm text-gray-600'>Priority support</span>
                  </li>
                  <li className='flex gap-x-2 before:content-none'>
                    <CheckIcon className='h-5 w-5 flex-shrink-0 text-[#6366F1]' />
                    <span className='text-sm text-gray-600'>All Hobby features</span>
                  </li>
                </ul>
              </div>
              <Link
  to="/signup"
  className="
    mt-6            /* gap from the content above */
    mb-4            /* gap from the bottom of the card */
    block
    w-full          /* fill the card’s inner width */
    rounded-full      /* smooth corners */
    bg-[#6366F1]     /* blue background */
    py-3            /* vertical padding */
    text-center
    font-semibold
    text-white
    hover:bg-blue-700
    focus:outline-none focus:ring-2 focus:ring-blue-500
    transition
  "
>
  Get started
</Link>
            </div>

            {/* Scale Plan */}
            <div className='flex flex-col h-full rounded-3xl bg-white px-5 py-8 ring-1 ring-gray-200'>
              <div className='flex-grow'>
                <h3 className='text-xl font-semibold text-gray-900'>Scale</h3>
                <p className='mt-4 text-sm text-gray-600'>For high-traffic applications</p>
                <div className='mt-6 flex items-baseline'>
                  <span className='text-3xl font-bold tracking-tight text-gray-900'>$99.99</span>
                  <span className='ml-1 text-sm font-medium text-gray-500'>/month</span>
                </div>
                <ul className='mt-6 space-y-3 list-none marker:content-none'>
                  <li className='flex gap-x-2 before:content-none'>
                    <CheckIcon className='h-5 w-5 flex-shrink-0 text-[#6366F1]' />
                    <span className='text-sm text-gray-600'>3,000 concurrent connections</span>
                  </li>
                  <li className='flex gap-x-2 before:content-none'>
                    <CheckIcon className='h-5 w-5 flex-shrink-0 text-[#6366F1]' />
                    <span className='text-sm text-gray-600'>6M messages/day</span>
                  </li>
                  <li className='flex gap-x-2 before:content-none'>
                    <CheckIcon className='h-5 w-5 flex-shrink-0 text-[#6366F1]' />
                    <span className='text-sm text-gray-600'>Dedicated support</span>
                  </li>
                  <li className='flex gap-x-2 before:content-none'>
                    <CheckIcon className='h-5 w-5 flex-shrink-0 text-[#6366F1]' />
                    <span className='text-sm text-gray-600'>All Startup features</span>
                  </li>
                </ul>
              </div>
              <Link
  to="/signup"
  className="
    mt-6            /* gap from the content above */
    mb-4            /* gap from the bottom of the card */
    block
    w-full          /* fill the card’s inner width */
    rounded-full      /* smooth corners */
    bg-[#6366F1]     /* blue background */
    py-3            /* vertical padding */
    text-center
    font-semibold
    text-white
    hover:bg-blue-700
    focus:outline-none focus:ring-2 focus:ring-blue-500
    transition
  "
>
  Get started
</Link>
            </div>

            {/* Enterprise Plan */}
            <div className='flex flex-col h-full rounded-3xl bg-white px-5 py-8 ring-1 ring-gray-200'>
              <div className='flex-grow'>
                <h3 className='text-xl font-semibold text-gray-900'>Enterprise</h3>
                <p className='mt-4 text-sm text-gray-600'>Custom solutions for large-scale needs</p>
                <div className='mt-6 flex items-baseline'>
                  <span className='text-3xl font-bold tracking-tight text-gray-900'>Custom</span>
                </div>
                <ul className='mt-6 space-y-3 list-none marker:content-none'>
                  <li className='flex gap-x-2 before:content-none'>
                    <CheckIcon className='h-5 w-5 flex-shrink-0 text-[#6366F1]' />
                    <span className='text-sm text-gray-600'>10,000+ concurrent connections</span>
                  </li>
                  <li className='flex gap-x-2 before:content-none'>
                    <CheckIcon className='h-5 w-5 flex-shrink-0 text-[#6366F1]' />
                    <span className='text-sm text-gray-600'>Unlimited messages/day</span>
                  </li>
                  <li className='flex gap-x-2 before:content-none'>
                    <CheckIcon className='h-5 w-5 flex-shrink-0 text-[#6366F1]' />
                    <span className='text-sm text-gray-600'>Custom message size limits</span>
                  </li>
                  <li className='flex gap-x-2 before:content-none'>
                    <CheckIcon className='h-5 w-5 flex-shrink-0 text-[#6366F1]' />
                    <span className='text-sm text-gray-600'>24/7 dedicated support</span>
                  </li>
                </ul>
              </div>
              <a
                href='mailto:hello@jetsocket.io'
                className="
                mt-6            /* gap from the content above */
                mb-4            /* gap from the bottom of the card */
                block
                w-full          /* fill the card’s inner width */
                rounded-full      /* smooth corners */
                bg-[#6366F1]     /* blue background */
                py-3            /* vertical padding */
                text-center
                font-semibold
                text-white
                hover:bg-blue-700
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className='bg-white'>
        <div className='mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40'>
          <div className='mx-auto max-w-4xl divide-y divide-gray-900/10'>
            <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900'>Frequently asked questions</h2>
            <dl className='mt-10 space-y-6 divide-y divide-gray-900/10'>
              <div className='pt-6'>
                <dt>
                  <button className='flex w-full items-start justify-between text-left text-gray-900'>
                    <span className='text-base font-semibold leading-7'>How compatible is JetSocket with Pusher?</span>
                    <span className='ml-6 flex h-7 items-center'>
                      <ChevronDownIcon className='h-6 w-6' />
                    </span>
                  </button>
                </dt>
                <dd className='mt-2 pr-12'>
                  <p className='text-base leading-7 text-gray-600'>
                    JetSocket is 100% API compatible with Pusher. All Pusher features including channels, presence channels, 
                    client events, and webhooks work exactly the same way. Just change your credentials and you're good to go.
                  </p>
                </dd>
              </div>
              <div className='pt-6'>
                <dt>
                  <button className='flex w-full items-start justify-between text-left text-gray-900'>
                    <span className='text-base font-semibold leading-7'>What kind of support do you offer?</span>
                    <span className='ml-6 flex h-7 items-center'>
                      <ChevronDownIcon className='h-6 w-6' />
                    </span>
                  </button>
                </dt>
                <dd className='mt-2 pr-12'>
                  <p className='text-base leading-7 text-gray-600'>
                    We offer 24/7 email support for all paid plans. Enterprise customers get dedicated Slack support 
                    and a dedicated account manager.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className='bg-white'>
        <div className='mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8'>
          <div className='relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16'>
            <h2 className='mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl'>
              Ready to reduce your real-time infrastructure costs?
            </h2>
            <p className='mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300'>
              Join thousands of developers who've switched to JetSocket. Start your free trial today.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Link
                to='/signup'
                className='rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
              >
                Get started
              </Link>
              <a href='#how-it-works' className='text-sm font-semibold leading-6 text-white'>
                Learn more <span aria-hidden='true'>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;