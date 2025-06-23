import { createUseStyles } from 'react-jss'
import style from './style'
import {
  TypographyElement,
  Icon,
  Icons,
  neutral,
  blue,
  Spacing
} from '@pro_boa/ui'
import { useState, useEffect } from 'react'
import SelectItemsList from './SelectItemsList'
import Text from './text.json'

const defaultSelectItem = { Id: 10, Name: 10 }
const pageSizes = [{ Id: 10, Name: 10 }, { Id: 20, Name: 20 }, { Id: 25, Name: 25 }]

const calculateTotalPages = (totalRows, rowsPerPage) => {
  if (totalRows <= 0 || rowsPerPage <= 0) {
    return 0
  }
  const totalPages = Math.ceil(totalRows / rowsPerPage)
  return totalPages
}

const displayedPages = (currentPage, totalPages) => {
  const pagesToShow = 5
  const halfPagesToShow = Math.floor(pagesToShow / 2)
  let startPage = currentPage - halfPagesToShow
  let endPage = currentPage + halfPagesToShow

  if (startPage < 1) {
    startPage = 1
    endPage = Math.min(pagesToShow, totalPages)
  }

  if (endPage > totalPages) {
    endPage = totalPages
    startPage = Math.max(1, totalPages - pagesToShow + 1)
  }

  const pageList = []
  for (let i = startPage; i <= endPage; i++) {
    pageList.push(i)
  }

  return pageList
}

export default ({ page, setRowsPerPage, skip = 0, count, data, setPage }) => {
  const useStyle = createUseStyles(style)
  const [pageSize, setPageSize] = useState(defaultSelectItem)
  const [statePage, setStatePage] = useState(page)
  const pages = Array.from({ length: calculateTotalPages(count, pageSize.Id) }, (_, i) => (i + 1))
  const arrowDisableConditions = {
    doubleLeft: page < 3,
    left: page === 0,
    right: page === pages.length - 1,
    doubleRight: page > pages.length - 4
  }
  useEffect(() => setStatePage(page), [page])
  const { container, selectListContainer, doubleArrowContainerRight, doubleArrowContainerLeft, arrowStyle, arrowContainerLeft, arrowContainerRight } = useStyle({ arrowDisableConditions })
  return (
    <div className={container}>
      <div className={doubleArrowContainerLeft} onClick={() => !arrowDisableConditions.doubleLeft && setPage(0)}>
        <Icon iconName={Icons.roundedLeft} style={arrowStyle} />
        <Icon iconName={Icons.roundedLeft} style={arrowStyle} />
      </div>
      <div className={arrowContainerLeft} onClick={() => !arrowDisableConditions.left && setPage(page - 1)}>
        <Icon iconName={Icons.roundedLeft} style={arrowStyle} />
      </div>
      {displayedPages(statePage + 1, calculateTotalPages(count, pageSize.Id)).map((item, key) => (
        <TypographyElement
          fontWeight={400}
          fontSize='11px'
          fontFamily='Muli Regular'
          margin={Spacing(0, 3, 0, 3)}
          lineHeight='15px'
          cursor='pointer'
          handleClick={() => setPage(item - 1)}
          color={item === statePage + 1 ? blue[0] : neutral[4]}
          key={key}
        >
          {item}
        </TypographyElement>)
      )}
      <div className={arrowContainerRight} onClick={() => !arrowDisableConditions.right && setPage(statePage + 1)}>
        <Icon iconName={Icons.roundedRight} style={arrowStyle} />
      </div>
      <div className={doubleArrowContainerRight} onClick={() => !arrowDisableConditions.doubleRight && setPage(pages.length - 1)}>
        <Icon iconName={Icons.roundedRight} style={arrowStyle} />
        <Icon iconName={Icons.roundedRight} style={arrowStyle} />
      </div>
      <div className={selectListContainer}>
        <SelectItemsList
          dataTest='quantity-select-list'
          label=''
          valueField='Name'
          selectedItem={pageSize.Name}
          onSelectedItem={(item) => {
            setPageSize(item)
            setPage(0)
            setRowsPerPage(item.Id)
          }}
          items={pageSizes}
        />
      </div>
      <TypographyElement
        fontWeight={400}
        fontSize='11px'
        fontFamily='Muli Regular'
        margin={Spacing(0, 1, 0, 4)}
        lineHeight='15px'
        color={neutral[6]}
      >
        {skip + 1}-{skip + data.length} {Text.of} {count}
      </TypographyElement>
    </div>
  )
}
