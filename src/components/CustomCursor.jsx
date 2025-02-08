import React, { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import './CustomCursor.css'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)
  const [isHoverTile, setIsHoverTile] = useState(false)

  useEffect(() => {
    // Update cursor position and whether it's over a tile on every mouse move
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      // Check if the element under the cursor is inside a tile (.work-item)
      const element = document.elementFromPoint(e.clientX, e.clientY)
      if (element && element.closest('.work-item')) {
        setIsHoverTile(true)
      } else {
        setIsHoverTile(false)
      }
    }

    // Shrink the cursor when the mouse is pressed
    const onMouseDown = () => setIsActive(true)
    const onMouseUp = () => setIsActive(false)

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

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