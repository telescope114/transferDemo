import React, { ReactNode, useState } from 'react'
import { TransferItemData as Item } from '../../hooks/transfer'
export interface TransferItemProps {
  dataSource: Item[]
  title: string
  onChange: (keys: string[]) => void
}

const TransferItem: React.FC<TransferItemProps> = ({ dataSource, title, onChange }) => {
  const change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const aaa = (Array.from(e.target.selectedOptions) as HTMLOptionElement[]).map(item => (item.value))
    onChange(aaa)
  }
  return (<>
    <p className="font-bold mb-2">{ title }</p>
    <select
      className="w-full h-64 border rounded p-2"
      multiple
      onChange={change}
    >
      {dataSource.map((item) => (
        <option key={item.key} value={item.key}>
          {item.title}
        </option>
      ))}
    </select>
  </>)
}

TransferItem.displayName = 'TransferItem'
export default TransferItem
