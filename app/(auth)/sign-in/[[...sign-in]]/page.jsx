import { SignIn } from "@clerk/nextjs";
import { Icons } from "../../../../components/Icons";
import Image from "next/image";
import Link from "next/link";
 
export default function Page() {
  return (

<section className="bg-white">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <section className="relative flex h-32 items-end bg-white lg:col-span-5 lg:h-full xl:col-span-6">
      <Image
        alt=""
        src="/login3.jpg"
        className="absolute inset-0 h-full w-full object-cover"
        fill
      />

      <div className="hidden lg:relative lg:block lg:p-12">
        <Link className="block text-white" href="/">
          <span className="sr-only">Home</span>
          <Icons.logo className="size-12 text-white" />
        </Link>


        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Welcome to Stock Watch 
        </h2>

        <p className="mt-4 leading-relaxed text-white/90">
          Your ultimate companion for navigating the dynamic world of stocks.
        </p>
      </div>
    </section>

    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <div className="relative -mt-16 block lg:hidden">
          <Link
            className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
            href="/"
          >
            <span className="sr-only">Home</span>
           <Icons.logo className="size-8" />
          </Link>

          <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
             Welcome to Coinit  
          </h1>

          <p className="mt-4 leading-relaxed text-gray-500">
            Effortlessly manage your finances with our intuitive Stock tracker website, designed to simplify your budgeting tasks.
          </p>
        </div>

        <SignIn />
      </div>
    </main>
  </div>
</section>
  )
  ;
}