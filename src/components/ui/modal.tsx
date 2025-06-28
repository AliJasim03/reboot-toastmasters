'use client'

import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { useEffect, ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
  showCloseButton?: boolean
  closeOnBackdropClick?: boolean
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full h-full'
}

export function Modal({
                        isOpen,
                        onClose,
                        children,
                        title,
                        size = 'md',
                        className,
                        showCloseButton = true,
                        closeOnBackdropClick = true
                      }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={closeOnBackdropClick ? onClose : undefined}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative w-full rounded-xl bg-white shadow-xl',
          sizeClasses[size],
          size === 'full' ? 'h-full m-0' : 'max-h-[90vh] overflow-auto',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-cool-gray-200">
            {title && (
              <h2 className="text-xl font-semibold text-loyal-blue">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 text-cool-gray-500 hover:text-cool-gray-700 hover:bg-cool-gray-100 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className={cn(
          title || showCloseButton ? 'p-6 pt-4' : 'p-6'
        )}>
          {children}
        </div>
      </div>
    </div>
  )

  // Use portal to render modal at document body level
  return createPortal(modalContent, document.body)
}

// Modal components for easier composition
export function ModalHeader({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  )
}

export function ModalFooter({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={cn('flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-cool-gray-200', className)}>
      {children}
    </div>
  )
}

export function ModalTitle({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <h3 className={cn('text-lg font-semibold text-loyal-blue', className)}>
      {children}
    </h3>
  )
}

export function ModalDescription({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <p className={cn('text-cool-gray-600 mt-2', className)}>
      {children}
    </p>
  )
}