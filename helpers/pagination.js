module.exports = (req) => {
    const objPagination = {
        limitTask: 2,
        currentPage: 1,
        skipItem: 0,
    }
    if(req.query.limit){
        objPagination.limitTask = req.query.limit;
    }
    if(req.query.page){
        objPagination.skipItem = (req.query.page - 1) * objPagination.limitTask;
    }
    return objPagination;
}