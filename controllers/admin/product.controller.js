const Product = require("../../model/product.model");
const filterStatusHelper=require("../../helper/filterStatus");
const searchHelper=require("../../helper/search");
//[GET] /admin/products


module.exports.index = async (req, res) => {

  //lọc sp
  const filterStatus=filterStatusHelper(req.query);
  let find = {
    deleted: false
  }
  if(req.query.status){
    find.status=req.query.status;
  }
  //tìm kiếm sản phẩm
  const search=searchHelper(req.query);
  if(search.regex){
    find.title=search.regex;

  }
  //phân trang
  let objPagination={
    limit:4,
    currentPage:1
  }
  if(req.query.page){
    objPagination.currentPage=parseInt(req.query.page);
  }
  objPagination.skip=(objPagination.currentPage-1)*objPagination.limit;

  const countProducts = await Product.countDocuments(find);
  const totalPage=Math.ceil(countProducts/objPagination.limit);
  objPagination.totalPage=totalPage;
  const products = await Product.find(find).limit(objPagination.limit).skip(objPagination.skip);

  res.render('admin/pages/products/index', {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus:filterStatus,
    keyword:search.keyword,
    pagination:objPagination
  });
}