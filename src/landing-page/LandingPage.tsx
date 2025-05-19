import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Icons
import { 
  BoltIcon, 
  CurrencyDollarIcon, 
  ArrowPathIcon, 
  CloudArrowUpIcon,
  CheckIcon,
  ChevronDownIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

type PublishLanguage = 'nodejs';
type SubscribeLanguage = 'javascript' | 'android' | 'ios';

const LandingPage = () => {
  const [publishTab, setPublishTab] = useState<PublishLanguage>('nodejs');
  const [subscribeTab, setSubscribeTab] = useState<SubscribeLanguage>('javascript');

  const publishExamples: Record<PublishLanguage, string> = {
    nodejs: `const jetsocket = new Jetsocket('YOUR_APP_KEY', {
  cluster: 'eu',
  encrypted: true
});

jetsocket.trigger('my-channel', 'my-event', {
  message: 'Hello from Jetsocket!'
});`
  };

  const subscribeExamples: Record<SubscribeLanguage, string> = {
    javascript: `const jetsocket = new Jetsocket('YOUR_APP_KEY', {
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
    <main className='min-h-screen bg-white'>
      {/* Beta Banner */}
      <div className='bg-yellow-100'>
        <div className='mx-auto max-w-7xl px-6 py-3 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-center gap-x-2'>
            <BeakerIcon className='h-5 w-5 text-yellow-800' />
            <p className='text-sm font-medium text-yellow-800'>
              Jetsocket is currently in beta. Join us in shaping the future of real-time communication!
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className='relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20' aria-labelledby="hero-heading">
        <div className='mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40'>
          <div className='mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8'>
            <div className='mt-24 sm:mt-32 lg:mt-16'>
              <a href='#features' className='inline-flex space-x-6'>
                <span className='rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10'>
                  Blazing Fast & Reliable Real-Time
                </span>
              </a>
            </div>
            <h1 id="hero-heading" className='mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
              Power Your Applications with Lightning-Fast Real-Time Messaging
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Jetsocket delivers high-performance, scalable, and developer-friendly real-time infrastructure. Build robust features quickly and affordably. Seamlessly migrate from other services like Pusher with our compatible API.
            </p>
            <div className='mt-10 flex items-center gap-x-6'>
              <Link
                to="/signup"
                className="
                  mt-6
                  mb-4
                  block
                  w-full
                  rounded-full
                  bg-[#6366F1]
                  py-3
                  text-center
                  font-semibold
                  text-white
                  hover:bg-blue-700
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition
                "
                aria-label="Get started with Jetsocket"
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
                      <div className='flex border-b border-gray-800' role="tablist">
                        <button
                          className='px-4 py-2 text-sm font-medium bg-indigo-600 text-white'
                          role="tab"
                          aria-selected="true"
                          aria-controls="nodejs-code"
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
                      <pre className='p-4 text-sm overflow-x-auto' id="nodejs-code" role="tabpanel">
                        <code className='text-[#e6edf3] font-mono'>{publishExamples[publishTab]}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Subscribe Example */}
                  <div>
                    <h3 className='text-lg font-semibold mb-4 text-white'>Subscribe</h3>
                    <div className='bg-[#0d1117] rounded-lg overflow-hidden'>
                      <div className='flex border-b border-gray-800' role="tablist">
                        <button
                          className='px-4 py-2 text-sm font-medium bg-indigo-600 text-white'
                          role="tab"
                          aria-selected="true"
                          aria-controls="javascript-code"
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
                      <pre className='p-4 text-sm overflow-x-auto' id="javascript-code" role="tabpanel">
                        <code className='text-[#e6edf3] font-mono'>{subscribeExamples[subscribeTab]}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='bg-white py-24 sm:py-32' aria-labelledby="features-heading">
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:text-center'>
            <h2 id="features-heading" className='text-base font-semibold leading-7 text-indigo-600'>Why Choose Jetsocket?</h2>
            <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              The Modern Solution for Real-Time Communication
            </p>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Jetsocket is engineered from the ground up for unmatched performance, massive scalability, and a delightful developer experience. Focus on building features, not managing infrastructure.
            </p>
          </div>
          <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
            <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3'>
              <div className='flex flex-col'>
                <dt className='flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900'>
                  <BoltIcon className='h-5 w-5 flex-none text-indigo-600' aria-hidden="true" />
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
                  <ArrowPathIcon className='h-5 w-5 flex-none text-indigo-600' aria-hidden="true" />
                  Seamless Integration & Migration
                </dt>
                <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600'>
                  <p className='flex-auto'>
                    Effortlessly integrate Jetsocket into your new or existing projects. Our Pusher-compatible API allows for a smooth transition in minutes if you're migrating.
                  </p>
                </dd>
              </div>
              <div className='flex flex-col'>
                <dt className='flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900'>
                  <CurrencyDollarIcon className='h-5 w-5 flex-none text-indigo-600' aria-hidden="true" />
                  Predictable & Competitive Pricing
                </dt>
                <dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600'>
                  <p className='flex-auto'>
                    Get premium real-time features at a fraction of the cost of alternatives. Our transparent pricing ensures no surprises.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id='how-it-works' className='bg-gray-50 py-24 sm:py-32' aria-labelledby="how-it-works-heading">
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:text-center'>
            <h2 id="how-it-works-heading" className='text-base font-semibold leading-7 text-indigo-600'>Get Started in Minutes</h2>
            <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Launch Your Real-Time Features with Ease
            </p>
          </div>
          <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24'>
            <dl className='grid grid-cols-1 gap-y-16 gap-x-8 lg:grid-cols-3'>
              <div className='relative pl-16'>
                <dt className='text-base font-semibold leading-7 text-gray-900'>
                  <div className='absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600'>
                    <span className='text-white'>1</span>
                  </div>
                  Sign Up for Jetsocket
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
                  Configure Your Application
                </dt>
                <dd className='mt-2 text-base leading-7 text-gray-600'>
                  Integrate Jetsocket using your new API credentials. If migrating, our Pusher-compatible API makes this step a breeze.
                </dd>
              </div>
              <div className='relative pl-16'>
                <dt className='text-base font-semibold leading-7 text-gray-900'>
                  <div className='absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600'>
                    <span className='text-white'>3</span>
                  </div>
                  Go Live & Scale
                </dt>
                <dd className='mt-2 text-base leading-7 text-gray-600'>
                  Deploy your application and enjoy fast, reliable real-time messaging. Scale your usage as your application grows.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <div id='pricing' className='bg-gray-50 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>Simple, transparent pricing</h2>
            <p className='mt-6 text-base leading-7 text-gray-600'>
              Affordable plans for projects of all sizes. Enjoy significant cost savings without compromising on features or reliability. (Often up to 70% less than services like Pusher).
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
    w-full          /* fill the card's inner width */
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
    w-full          /* fill the card's inner width */
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
    w-full          /* fill the card's inner width */
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
                w-full          /* fill the card's inner width */
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
                    <span className='text-base font-semibold leading-7'>What makes Jetsocket different from other real-time services?</span>
                    <span className='ml-6 flex h-7 items-center'>
                      <ChevronDownIcon className='h-6 w-6' />
                    </span>
                  </button>
                </dt>
                <dd className='mt-2 pr-12'>
                  <p className='text-base leading-7 text-gray-600'>
                    Jetsocket is built for modern application needs, focusing on superior performance, scalability, developer experience, and cost-effectiveness. We offer a robust feature set with transparent pricing, allowing you to build and scale without worrying about complex infrastructure or surprise bills.
                  </p>
                </dd>
              </div>
              <div className='pt-6'>
                <dt>
                  <button className='flex w-full items-start justify-between text-left text-gray-900'>
                    <span className='text-base font-semibold leading-7'>How compatible is Jetsocket with Pusher?</span>
                    <span className='ml-6 flex h-7 items-center'>
                      <ChevronDownIcon className='h-6 w-6' />
                    </span>
                  </button>
                </dt>
                <dd className='mt-2 pr-12'>
                  <p className='text-base leading-7 text-gray-600'>
                    Jetsocket is 100% API compatible with Pusher. All Pusher features including channels, presence channels, 
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

      {/* Contact Form Section */}
      <div className='bg-white py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Get in Touch</h2>
            <p className='mt-2 text-lg leading-8 text-gray-600'>
              Have questions? We'd love to hear from you.
            </p>
          </div>
          <form action="mailto:hello@jetsocket.io" method="post" encType="text/plain" className='mx-auto mt-16 max-w-xl'>
            <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
              <div className='sm:col-span-2'>
                <label htmlFor='name' className='block text-sm font-semibold leading-6 text-gray-900'>
                  Name
                </label>
                <div className='mt-2.5'>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    autoComplete='name'
                    className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <label htmlFor='email' className='block text-sm font-semibold leading-6 text-gray-900'>
                  Email
                </label>
                <div className='mt-2.5'>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    autoComplete='email'
                    className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <label htmlFor='message' className='block text-sm font-semibold leading-6 text-gray-900'>
                  Message
                </label>
                <div className='mt-2.5'>
                  <textarea
                    name='message'
                    id='message'
                    rows={4}
                    className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>
            <div className='mt-10'>
              <button
                type='submit'
                className='block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className='bg-white'>
        <div className='mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8'>
          <div className='relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16'>
            <h2 className='mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl'>
              Ready to Power Your Apps with Jetsocket?
            </h2>
            <p className='mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300'>
              Experience the difference with our high-performance, scalable, and affordable real-time messaging solution. Start your free trial today.
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
    </main>
  );
};

export default LandingPage;