'use client'

import React from 'react'
import Button from '@/app/ui-components/buttons'

const Buttons: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">Button Examples</h1>
        
        <div className="space-y-6 p-6 bg-white rounded-lg shadow">
          {/* Filled Buttons */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Filled Buttons</h2>
            <div className="flex flex-wrap gap-3">
              <Button variant="filled">Filled</Button>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="success">Success</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </div>

          {/* Bordered Buttons */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Bordered Buttons</h2>
            <div className="flex flex-wrap gap-3">
              <Button variant="bordered">Bordered</Button>
              <Button className="border-blue-500 text-blue-500 hover:bg-blue-50">Blue</Button>
              <Button className="border-green-500 text-green-500 hover:bg-green-50">Green</Button>
              <Button className="border-red-500 text-red-500 hover:bg-red-50">Red</Button>
              <Button className="border-gray-500 text-gray-500 hover:bg-gray-50">Gray</Button>
            </div>
          </div>

          {/* Mixed Examples */}
         
          {/* Different Sizes */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Different Sizes</h2>
            <div className="flex items-center gap-3 flex-wrap">
              <Button className="px-2 py-1 text-xs border">XS</Button>
              <Button className="px-3 py-1 text-sm border">Small</Button>
              <Button className="border">Medium</Button>
              <Button className="px-5 py-2 text-lg border">Large</Button>
              <Button className="px-6 py-3 text-xl border">XL</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Buttons