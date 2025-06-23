import React from 'react'
import DataTable from './'
import Pagination from './Pagination'

const rows = [...Array(10)]

export default ({ titles }) => {
  const columns = titles?.map(name => ({ title: name, property: name }))
  const data = rows.map((item, i) => {
    const row = {}
    for (const key of titles) {
      row[key] = null
    }
    return row
  })
  const config = {
    columns: [...columns]
  }
  return (
    <div>
      <DataTable
        loading
        data={data}
        config={config}
      />
      <Pagination
        data={data}
      />
    </div>
  )
}
