import type React from "react"

interface TableProps {
  children: React.ReactNode
  className?: string
}

const Table: React.FC<TableProps> = ({ children, className = "" }) => {
  return (
    <div className="table-container">
      <table className={`table ${className}`}>{children}</table>
    </div>
  )
}

export default Table
