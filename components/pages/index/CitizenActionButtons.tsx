'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import CaseApplicationForm from './CaseApplicationForm'
import AvukatRequestForm from './AvukatRequestForm'

export default function CitizenActionButtons() {
  const [activeTab, setActiveTab] = useState('dava')

  return (
    <div className="bg-white shadow-md rounded-lg p-8 my-12">
      <h2 className="text-2xl font-bold text-center mb-6">Nasıl Yardımcı Olabiliriz?</h2>
      <div className="flex justify-center mb-8">
        <div className="bg-gray-200 p-1 rounded-full">
          <button
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeTab === 'dava' ? 'bg-gray-800 text-white' : 'text-gray-700'
            }`}
            onClick={() => setActiveTab('dava')}
          >
            Dava İçin Başvur
          </button>
          <button
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeTab === 'avukat' ? 'bg-gray-800 text-white' : 'text-gray-700'
            }`}
            onClick={() => setActiveTab('avukat')}
          >
            Avukat İste
          </button>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {activeTab === 'dava' ? <CaseApplicationForm /> : <AvukatRequestForm />}
      </motion.div>
    </div>
  )
}

