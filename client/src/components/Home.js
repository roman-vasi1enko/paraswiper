<<<<<<< HEAD
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'GitHub', href: 'https://github.com/roman-vasi1enko/paraswiper' },
  { name: 'Contacts', href: 'https://romanvasilenko.co/' }
=======
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'GitHub', href: 'https://github.com/roman-vasi1enko/paraswiper' },
  { name: 'Contacts', href: 'https://romanvasilenko.co/' },
  // { name: 'Marketplace', href: '#' },
  // { name: 'Company', href: '#' },
>>>>>>> main-holder
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
<<<<<<< HEAD
    <>
      <div className="isolate bg-slate-900 min-h-screen">
        <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="py-10 mx-10 lg:px-8 lg:mx-14">
          <nav className="flex items-center justify-between" aria-label="Global">
            <div className="flex lg:flex-1">
              <a href="" className="-m-1.5 p-1.5">
                <span className="sr-only">Paraswiper</span>
                <img className="h-9" src="./assets/paraswiper-logo2.png" alt="" />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-8 w-8 text-slate-200" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12 text-slate-200 mr-14">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} target="_blank" className="text-sm font-semibold leading-6 hover:text-spring-bud">
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:justify-end">
              <button className="btn btn-outline border-spring-bud">
                <a href="/login" className="text-sm text-spring-bud">
                    Log in &rarr;
                  </a>
              </button>
            </div>
            {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a href="/login" className="text-base font-semibold leading-6 text-spring-bud">
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            </div> */}
          </nav>
          <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <Dialog.Panel focus="true" className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
              <div className="flex items-center justify-between">
                <a href="" className="-m-1.5 p-1.5">
                  <span className="sr-only">Paraswiper</span>
                  <img className="h-6" src="./assets/paraswiper-logo2.png" alt="" />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                        target="_blank"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <a
                      href="/login"
                      className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                    >
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </div>
        <main className='pb-16'>
          <div className="relative px-6 lg:px-8 bg-white rounded-3xl mx-6 lg:mx-auto lg:w-3/4 shadow-lg shadow-spring-bud">
            <div className="mx-auto max-w-2xl py-12 sm:py-32 text-center">
              <div className="tooltip cursor-pointer" data-tip="This is a very first version of the software. It was tested to do the job but has some known and unknown bugs.">
                <div class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-500 ring-1 ring-inset ring-green-600/20 mb-4">Alpha version</div>
              </div>

              <div className="mb-6 sm:flex sm:justify-center">
                <div className="tooltip cursor-pointer" data-tip="Just add a Paraswiper channel as a Standard Moderator (restricted access).">
                  <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">No YouTube access delegation required</span>


                  {/* <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-blue-600 ring-1 ring-blue-500 hover:ring-orange-500 cursor-pointer select-none">
                    No YouTube access delegation required{' '}
                    <a href="" className="font-semibold text-lime-600">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Read more <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div> */}
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold italic tracking-tight text-slate-800 sm:text-6xl">
                Swipe 99% of YouTube spam comments
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  You went so far as a creator not to manage comments all day long. Meet the most robust YouTube antispam solution, get back the control, protect your community.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <div className="tooltip" data-tip="Contact roman@vasilenko.co to get access">
                    <a
                      // href="/signup"
                      href=""
                      className="rounded-md bg-spring-bud px-10 py-2.5 text-sm font-semibold text-gray-600 shadow-sm hover:bg-lime-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      {/* Get started */}
                      Sign up <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                  {/* <a href="" className="text-sm font-semibold leading-6 text-gray-900">
                    Learn more <span aria-hidden="true">→</span>
                  </a> */}
                </div>
              </div>
            </div>
            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
              {/* <svg
                className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                viewBox="0 0 1155 678"
              > */}
              <svg
                className="relative left-[calc(50%+3rem)] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[32.375rem]"
                viewBox="0 0 1155 378"
              >
                <path
                  fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                  fillOpacity=".8"
                  d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                />
                <defs>
                  <linearGradient
                    id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                    x1="1155.49"
                    x2="-78.208"
                    y1=".177"
                    y2="474.645"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#9089FC" />
                    <stop offset={1} stopColor="#FF80B5" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </main>
      </div>
    </>
=======
    <div className="isolate bg-slate-900 min-h-screen">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="px-6 py-6 lg:px-8 mx-14">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="" className="-m-1.5 p-1.5">
              <span className="sr-only">Paraswiper</span>
              <img className="h-9" src="./assets/paraswiper-logo2.png" alt="" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6 text-slate-200" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 text-slate-200 mr-14">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} target="_blank" className="text-sm font-semibold leading-6 hover:text-spring-bud">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:justify-end">
            <button className="btn btn-outline border-spring-bud">
              <a href="/login" className="text-sm text-spring-bud">
                  Log in <span aria-hidden="true">&rarr;</span>
                </a>
            </button>
          </div>
          {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="/login" className="text-base font-semibold leading-6 text-spring-bud">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div> */}
        </nav>
        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <Dialog.Panel focus="true" className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
            <div className="flex items-center justify-between">
              <a href="" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                      target="_blank"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href=""
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
      <main>
        <div className="relative px-6 lg:px-8 bg-white rounded-3xl mx-14 shadow-lg shadow-spring-bud">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-44 text-center">
            <div className="tooltip cursor-pointer" data-tip="This is a very first version of the software. It was tested to do the job but has some known and unknown bugs.">
              <div class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-500 ring-1 ring-inset ring-green-600/20 mb-4">Alpha version</div>
            </div>

            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="tooltip cursor-pointer" data-tip="Instead of full channel access sharing, you will need to add a Paraswiper bot as a Standard Moderator of your channel (limited access).">
                <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 cursor-pointer select-none">
                  No YouTube access delegation required{' '}
                  <a href="" className="font-semibold text-lime-600">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {/* Read more <span aria-hidden="true">&rarr;</span> */}
                  </a>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold italic tracking-tight text-slate-800 sm:text-6xl">
              Swipe 99% of YouTube spam comments
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                You went so far as a creator not to manage comments all day long. Meet the most robust YouTube antispam solution, get back the control, protect your community.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <div className="tooltip" data-tip="Contact roman@vasilenko.co to get access">
                  <a
                    // href="/signup"
                    href=""
                    className="rounded-md bg-spring-bud px-10 py-2.5 text-sm font-semibold text-gray-600 shadow-sm hover:bg-lime-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {/* Get started */}
                    Sign up <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
                {/* <a href="" className="text-sm font-semibold leading-6 text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </a> */}
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
            {/* <svg
              className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
              viewBox="0 0 1155 678"
            > */}
            <svg
              className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[32.375rem]"
              viewBox="0 0 1155 378"
            >
              <path
                fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                fillOpacity=".8"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9089FC" />
                  <stop offset={1} stopColor="#FF80B5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </main>
    </div>
>>>>>>> main-holder
  )
}
