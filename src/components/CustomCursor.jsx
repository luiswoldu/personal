import React, { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import './CustomCursor.css'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)
  const [isHoverTile, setIsHoverTile] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 440)

  useEffect(() => {
    // Handle resize events to check for mobile breakpoint
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 440)
    }

    // Update cursor position and whether it's over a tile on every mouse move
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      // Check if the element under the cursor is inside a tile (.work-item) or project detail elements
      const element = document.elementFromPoint(e.clientX, e.clientY)
      if (element && (
          element.closest('.work-item') || // Work section tiles
          element.closest('.project-detail-clickable') // Add this class to clickable elements in ProjectDetail
        )) {
        setIsHoverTile(true)
      } else {
        setIsHoverTile(false)
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
      className={`custom-cursor ${isActive ? 'cursor--active' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {/* Display the chevron icon only when hovering over a tile */}
      {isHoverTile && <ChevronRight className="cursor-icon" />}
    </div>
  )
}

export default CustomCursor 