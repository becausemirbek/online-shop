export const getPageCount = (pages) => {
  let pageCountArr = [];
  for(let i = 1; i < pages + 1; i++) {
    pageCountArr.push(i)
  }

  return pageCountArr
}