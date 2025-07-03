import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const year = new Date().getFullYear();

  return (
    // Set the default text color and use the base body font (Source Sans 3)
    <div className="flex flex-col min-h-screen font-body bg-fair-gray text-rich-black">
      {/* --- HERO SECTION --- */}
      <header className="bg-toastmasters-hero text-white py-10 flex flex-col items-center gap-4 text-center">
        <Image
          src="/toastmasters-logo.png"
          alt="Toastmasters International logo"
          width={120}
          height={120}
          priority
        />
        {/* Use the brand-approved headline font */}
        <h1 className="text-4xl sm:text-5xl font-bold font-heading tracking-tight text-balance">
          Reboot Toastmasters Club
        </h1>
        <p className="text-yellow text-lg text-balance">
          Where Leaders Are Made
        </p>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col items-center gap-12 p-8 text-center">
        <div className="max-w-xl flex flex-col gap-6">
          <p className="text-lg text-pretty">
            Join us to practise public speaking, develop leadership skills, and have fun in a supportive environment.
          </p>
          <Link
            href="/join"
            className="inline-block rounded-md bg-maroon hover:bg-rich-maroon text-white px-8 py-3 font-semibold font-heading shadow-lg transition-colors"
          >
            Visit as a Guest
          </Link>
        </div>

        {/* --- FULL TYPOGRAPHY SHOWCASE --- */}
        <div className="w-full max-w-5xl mx-auto space-y-8 text-left p-6 bg-white border rounded-lg">
          <h2 className="text-3xl font-bold font-heading text-center text-loyal mb-6">Typography Guide</h2>

          {/* Primary Fonts */}
          <section>
            <h3 className="font-heading font-bold text-xl text-maroon">Primary Headline Font (`font-heading`)</h3>
            <p className="font-heading text-4xl mt-2">The quick brown fox jumps over the lazy dog.</p>
            <p className="text-sm text-gray-600 mt-1">Brand Alternate for Gotham: <span className="font-semibold">Montserrat</span></p>
          </section>

          <hr />

          <section>
            <h3 className="font-heading font-bold text-xl text-maroon">Primary Body Font (`font-body`)</h3>
            <p className="font-body text-lg mt-2">The quick brown fox jumps over the lazy dog. This is the main text you will use for paragraphs and most content on the website. It is highly legible and brand-approved.</p>
            <p className="text-sm text-gray-600 mt-1">Brand Alternate for Myriad Pro: <span className="font-semibold">Source Sans 3</span></p>
          </section>

          <hr />

          {/* Script Fonts */}
          <section>
            <h3 className="font-heading font-bold text-xl text-maroon">Special Event Fonts</h3>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Corinthia (`font-script-corinthia`)</p>
                <p className="font-script-corinthia text-5xl text-loyal">Club Anniversary!</p>
              </div>
              <div>
                <p className="font-semibold">Luxurious Script (`font-script-luxurious`)</p>
                <p className="font-script-luxurious text-5xl text-maroon">Gala Dinner</p>
              </div>
            </div>
          </section>
        </div>

        {/* Your other color/gradient showcases can remain here */}

      </main>

      <footer className="bg-loyal py-4 text-center text-sm text-gray">
        © {year} Reboot Toastmasters Club · Toastmasters International
      </footer>
    </div>
  );
}