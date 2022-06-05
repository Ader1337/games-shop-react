import React from 'react'
import './UI.scss'
function MyButton({children, ...props}) {
  return (
      <button {...props} className='button'>{children}</button>
  )
}

export default MyButton