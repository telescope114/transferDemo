import React, { useState, useEffect } from 'react'
import { TransferItemData } from '@/components/hooks/transfer'
import Item from './Item'

export type { TransferItemData } from '@/components/hooks/transfer'

export interface TransferProps {
  dataSource: TransferItemData[],
  defineValue?: string[],
  onChange?: (data: string[], dataList: TransferItemData[]) => void
}

const Transfer: React.FC<TransferProps> = ({ dataSource, defineValue, onChange }) => {
  // 左右两边显示dom
  const [left, setLeft] = useState<TransferItemData[]>([])
  const [right, setRight] = useState<TransferItemData[]>([])
  // 左右两边被选中部分
  const [leftCheck, setLeftCheck] = useState<string[]>([])
  const [rightCheck, setRightCheck] = useState<string[]>([])

  // 初始化左右两边dom
  useEffect(() => {
    if (defineValue) {
      dataSource.forEach(item => {
        if (defineValue.findIndex(i => i ===item.key) >= 0) setRight(value => [...value, item])
        else setLeft(value => [...value, item])
      })
    } else {
      setLeft(dataSource)
    }
    return () => {
      // 销毁事件
      setLeft([])
      setRight([])
    }
  }, [])
  // 监听右边，若是变换 onChange
  useEffect(() => {
    if (onChange) {
      onChange(right.map(item => item.key), right)
    }
  }, [right])
  const move = (type: 'add' | 'remove') => {
    if (type === 'add') {
      leftCheck.forEach(async (item) => {
        let itemData: TransferItemData
        setLeft(val => {
          const index = val.findIndex(i => (i.key === item))
          if (index >= 0) {
            itemData = val.splice(index, 1)[0]
          }
          return val
        })
        setRight(val => [...val, itemData])
        setLeftCheck([])
      })
    } else {
      rightCheck.forEach(item => {
        let itemData: TransferItemData
        setRight(val => {
          const index = val.findIndex(i => (i.key === item))
          if (index >= 0) {
            itemData = val.splice(index, 1)[0]
          }
          return val
        })
        setLeft(val => [...val, itemData])
        setRightCheck([])
      })
    }
  }
  
  return (
    <div className="flex justify-center">
      <div className="w-1/3">
        <Item title="可选项" dataSource={left} onChange={(keys) => setLeftCheck(keys)} />
      </div>
      <div className="flex flex-col justify-center items-center w-1/12">
        <button
          disabled={!leftCheck.length}
          className={`my-2 px-4 py-2 rounded focus:outline-none ${leftCheck.length ? 'bg-blue-500 text-white hover:bg-blue-600 ' : 'bg-gray-300 text-black cursor-not-allowed '}`}
          onClick={() => { move('add') }}
        >{ '>' }</button>
        <button
          disabled={!rightCheck.length}
          className={`my-2 px-4 py-2 rounded focus:outline-none ${rightCheck.length ? 'bg-blue-500 text-white hover:bg-blue-600 ' : 'bg-gray-300 text-black cursor-not-allowed '}`}
          onClick={() => { move('remove') }}
        >{ '<' }</button>
      </div>
      <div className="w-1/3">
        <Item title="已选项" dataSource={right} onChange={(keys) => setRightCheck(keys)} />
      </div>
    </div>
  )
}


Transfer.displayName = 'Transfer'
export default Transfer
