// Replace your current page.tsx content temporarily with this test
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function HomePage() {
  return (
    <div className="min-h-screen p-8 space-y-8">
      <h1 className="text-4xl font-bold text-loyal-blue">
        🎨 Toastmasters Colors Test
      </h1>

      {/* Test basic colors */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Colors Test</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-loyal-blue text-white p-4 rounded-lg text-center">
            <div className="font-semibold">Loyal Blue</div>
            <div className="text-xs opacity-90">#004165</div>
          </div>
          <div className="bg-true-maroon text-white p-4 rounded-lg text-center">
            <div className="font-semibold">True Maroon</div>
            <div className="text-xs opacity-90">#772432</div>
          </div>
          <div className="bg-cool-gray text-white p-4 rounded-lg text-center">
            <div className="font-semibold">Cool Gray</div>
            <div className="text-xs opacity-90">#A9B2B1</div>
          </div>
          <div className="bg-happy-yellow text-loyal-blue p-4 rounded-lg text-center">
            <div className="font-semibold">Happy Yellow</div>
            <div className="text-xs opacity-90">#F2DF74</div>
          </div>
        </div>
      </div>

      {/* Test basic Tailwind colors */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Tailwind Test</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-red-500 text-white p-4 rounded-lg text-center">
            Red 500 (should work)
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-lg text-center">
            Blue 500 (should work)
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg text-center">
            Green 500 (should work)
          </div>
        </div>
      </div>

      {/* Test gradients */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Gradient Test</h2>
        <div className="space-y-4">
          <div className="bg-loyal-blue-gradient text-white p-6 rounded-lg">
            <div className="font-semibold text-lg">Loyal Blue Gradient</div>
            <div className="text-sm opacity-90">Should show blue gradient</div>
          </div>
          <div className="bg-toastmasters-primary text-white p-6 rounded-lg">
            <div className="font-semibold text-lg">Toastmasters Primary</div>
            <div className="text-sm opacity-90">Should show blue to maroon gradient</div>
          </div>
        </div>
      </div>

      {/* Test buttons */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Button Test</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary (Loyal Blue)</Button>
          <Button variant="secondary">Secondary (Outline)</Button>
          <Button variant="accent">Accent (Happy Yellow)</Button>
          <Button variant="maroon">Maroon</Button>
        </div>
      </div>

      {/* Test badges */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Badge Test</h2>
        <div className="flex flex-wrap gap-4">
          <Badge variant="default">Default Badge</Badge>
          <Badge variant="accent">Accent Badge</Badge>
          <Badge variant="maroon">Maroon Badge</Badge>
          <Badge variant="secondary">Secondary Badge</Badge>
        </div>
      </div>

      {/* Font test */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Font Test</h2>
        <div className="space-y-2">
          <p className="font-montserrat text-lg">This should be Montserrat font</p>
          <p className="font-source-sans text-lg">This should be Source Sans 3 font</p>
          <p className="font-corinthia text-2xl">This should be Corinthia script font</p>
        </div>
      </div>
    </div>
  )
}