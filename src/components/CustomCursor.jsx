import React, { useEffect, useState } from 'react'
import './CustomCursor.css'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)
  const [isHoverClickable, setIsHoverClickable] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 440)

  useEffect(() => {
    // Handle resize events to check for mobile breakpoint
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 440)
    }

    // Update cursor position and whether it's over a clickable element
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      // Check if the element under the cursor is clickable
      const element = document.elementFromPoint(e.clientX, e.clientY)
      if (element && (
          element.closest('.work-item') || 
          element.closest('.project-detail-clickable')
        )) {
        setIsHoverClickable(true)
      } else {
        setIsHoverClickable(false)
      }
    }

    // Shrink the cursor when the mouse is pressed
    const onMouseDown = () => setIsActive(true)
    const onMouseUp = () => setIsActive(false)

    // Add event listeners
    window.addEventListener('resize', handleResize)
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  // Don't render the custom cursor on mobile
  if (isMobile) {
    return null
  }

  return (
    <div
      className={`custom-cursor ${isActive ? 'cursor--active' : ''} ${isHoverClickable ? 'cursor--hover' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  )
}

export default CustomCursor 