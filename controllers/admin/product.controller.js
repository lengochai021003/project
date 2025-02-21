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


  const products = await Product.find(find);


  res.render('admin/pages/products/index', {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus:filterStatus,
    keyword:search.keyword
  });
}