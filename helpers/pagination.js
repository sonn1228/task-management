module.exports = (req) => {
    const objPagination = {
        currentPage: 1,
        limitItem: 2,
        skipItem: 0
    }
    if (req.query.page) {
        objPagination.currentPage = req.query.page;
        objPagination.skipItem = (req.query.page - 1) * objPagination.limitItem;
    }
    if(req.query.limit){
        objPagination.limitItem = req.query.limit;    
    }
    return objPagination;
}