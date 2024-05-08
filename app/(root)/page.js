"use client";
import { Icons } from "../../components/Icons";
import { buttonVariants } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { isSignedIn } = useUser();
  return (
    <div className="overflow-x-hidden bg-gray-50">
      <header className="py-4 md:py-6" x-data="{expanded: false}">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="shrink-0 ">
              <Link href="/" className="flex items-center">
                <Icons.logo className="mr-2 size-8" />
                <span className="text-xl font-medium">Stock Watch</span>
              </Link>
            </div>

            <div className="lg:ml-auto lg:flex lg:items-center lg:space-x-10">
              {!isSignedIn ? (
                <Link href="/sign-in" className={cn(buttonVariants({className: "bg-black hover:bg-black/80"}))}>
                  Get started
                </Link>
              ) : (
                <UserButton afterSignOutUrl="/" />
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gray-50 pt-12 sm:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="px-6 text-sm text-gray-600">
              Stay Ahead, Trade Smart.
            </h1>
            <p className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-tight">
              Manage Your Stocks Control Your
              <span className="relative inline-flex sm:inline">
                <span className="absolute inset-0 size-full bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] opacity-30 blur-lg"></span>
                <span className="relative"> Money </span>
              </span>
            </p>

            <div className="mt-9 px-8 sm:flex sm:items-center sm:justify-center sm:space-x-5 sm:px-0">
              {!isSignedIn ? (
                <Link
                  href="/sign-in"
                  className={cn(
                    buttonVariants({ size: "lg", className: "bg-black hover:bg-black/80" })
                  )}
                >
                  Get started
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                    })
                  )}
                >
                  Dashboard
                  <Icons.right_arrow className="ml-2.5 size-4" />
                </Link>
              )}
            </div>

            {/* <p className="mt-8  text-sm font-medium text-gray-500">
              60 Days free trial · No credit card required
            </p> */}
          </div>
        </div>

        <div className="bg-white pb-12 mt-16">
          <div className="relative">
            <div className="absolute inset-0 h-2/3 bg-gray-50"></div>
            <div className="relative mx-auto">
              <div className="lg:mx-auto md:max-w-xl lg:max-w-6xl shadow-md">
                <Image
                  src="/dash.png"
                  alt=""
                  width={1440}
                  height={1440}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <footer>
        ;as
      </footer> */}
    </div>

  );
}
