import React from 'react'
import { createUseStyles } from 'react-jss'
import style from './style'
import {
  TypographyElement,
  blue,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Skeleton
} from '@pro_boa/ui'
import { arrowDown, arrowUp, bothArrows } from 'assets'

export default ({ config, data, handleSort, selectedField, sort, loading, inactive }) => {
  const useStyle = createUseStyles(style)
  const { tableRow, tableStyle, icon, columnStyle, filterStyle, pointer, customStyle } = useStyle({ config, inactive, loading })
  return (
    <table className={tableStyle}>
      <TableHead>
        <TableRow>
          {
            config.columns.map((column, i) => {
              return (
                <TableCell key={i}>
                  <div onClick={() => column.sortable ? handleSort(column.property) : null} className={column.sortable ? pointer : columnStyle}>
                    <TypographyElement
                      color={blue[0]}
                      fontWeight={600}
                      fontSize='13px'
                      lineHeight='16px'
                      component='p'
                    >
                      {column.title}
                    </TypographyElement>
                    {column.sortable
                      ? (
                        <div className={filterStyle}>
                          {selectedField !== column.property
                            ? <img src={bothArrows} className={icon} alt='sort' />
                            : sort
                              ? <img src={arrowDown} className={icon} alt='sort' />
                              : <img src={arrowUp} className={icon} alt='sort' />}
                        </div>)
                      : null}
                  </div>
                </TableCell>
              )
            }
            )
          }
        </TableRow>
      </TableHead>
      <TableBody>
        {
          data.map((item, i) => {
            return (
              (config.costumRowCondition && config.costumRowCondition(item))
                ? (
                  <>
                    {loading
                      ? <Skeleton lines={1} height={62} width='100%' className={customStyle} />
                      : config.costumRowRender(item)}
                  </>)
                : (
                  <tr
                    onClick={(e) => {
                      if (!loading) {
                        if (e.target.dataset.div === 'modal' || e.target.dataset.test === 'modal') {
                          return
                        }
                        if (config.handleRowClick) config.handleRowClick(item)
                      }
                    }}
                    key={i}
                    className={tableRow}
                  >
                    {
                      config.columns.map((row, i) => (
                        <TableCell key={i} padding='default'>
                          {loading
                            ? <Skeleton lines={1} height={20} width={200} margin='10px 0' gap={10} />
                            : row.render
                              ? row.render(item[row.property], { config, data }, item)
                              : item[row.property]}
                        </TableCell>
                      ))
                    }
                  </tr>)
            )
          }
          )
        }
      </TableBody>
    </table>
  )
}
