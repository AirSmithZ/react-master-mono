import React, { Fragment } from 'react'

type Props = {}

function Search({}: Props) {
  return (
    <Fragment>
        <div className='flex items-center'>
            <input
                className='w-96 h-8 border border-slate-200 px-4 rounded-full bg-slate-50'
            />
            <button
                className='w-16 h-8 mx-4 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300'
            >
                提问
            </button>
        </div>
    </Fragment>
  )
}

export default Search