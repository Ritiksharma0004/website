import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex flex-col gap-8 row-start-1 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/hospital-logo.png" // Change this to your hospital logo path
          alt="Hospital Logo"
          width={180}
          height={180}
          priority
        />
        <h1 className="text-4xl font-bold text-green-600">Welcome to Our Hospital Food Delivery System</h1>
        <p className="text-lg text-center sm:text-left text-gray-600 max-w-2xl">
          Our hospital food delivery system is designed to provide timely and nutritious meals for patients, ensuring optimal care throughout their treatment.
          To get started, log in and manage food delivery orders.
        </p>
      </header>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-green-600 text-white gap-2 hover:bg-green-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/login"
          >
            Get Started
          </Link>
         
        </div>
      </main>

      
    </div>
  );
}
