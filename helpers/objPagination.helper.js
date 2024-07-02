module.exports = (req) => {
  const objPagination = {
    limitItems: 5,
    skipItems: 0,
    currentPage: 1
  }
  if (req.query.limit) {
    objPagination.limitItems = parseInt(req.query.limit)
  }
  if (req.query.page) {
    const page = parseInt(req.query.page);
    objPagination.skipItems = (page - 1) * objPagination.limitItems;
    objPagination.currentPage = page;
  }
  return objPagination
}