import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      This was a proyect to practice some javascrypt, react and next concepts.
      <div className='text-sm'>
        <br />
        <Link target='_blank' href={'https://github.com/vm1990-Git'}>Link to GitHub</Link>
        <br />
        <Link target='_blank' href={'https://www.linkedin.com/in/valentin-miranda-b508a1297/'}>Link to LinkedIn</Link>
      </div>
    </div>
  )
}

export default page