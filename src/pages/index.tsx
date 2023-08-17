import React, { useCallback, useState } from 'react'
import Transfer, { type TransferItemData } from '@/components/atoms/Transfer'
const data: TransferItemData [] = [
  { key: '1', title: 'Item 1' },
  { key: '2', title: 'Item 2' },
  { key: '3', title: 'Item 3' },
  { key: '4', title: 'Item 4' },
  { key: '5', title: 'Item 5' },
  { key: '6', title: 'Item 6' },
  { key: '7', title: 'Item 7' },
  { key: '8', title: 'Item 8' },
  { key: '9', title: 'Item 9' },
  { key: '10', title: 'Item 10' },
  { key: '11', title: 'Item 11' },
  { key: '12', title: 'Item 12' },
]
const Home: React.FC = () => {
  const [keys, setKeys] = useState<string[]>([])
  const onChange = useCallback((data: string[], dataList: TransferItemData[]) => {
    setKeys(data)
    console.log(data)
    console.log(dataList)
  }, [keys])
  return (
    <main
      className={`w-screen h-screen`}
    >
      <Transfer dataSource={data} defineValue={['1', '4']} onChange={onChange} />
    </main>
  )
}

Home.displayName = 'Home'
export default Home