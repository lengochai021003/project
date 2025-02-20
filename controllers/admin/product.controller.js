const Product = require("../../model/product.model");
//[GET] /admin/products


module.exports.index = async (req, res) => {

  let filterStatus=[
    {
      name:"Tất cả",
      status:"",
      class:""
    },
    {
      name:"Hoạt động",
      status:"active",
      class:""
    },
    {
      name:"Dừng hoạt động",
      status:"inactive",
      class:""
    },
  ]
  let find = {
    deleted: false
  }
  if(req.query.status){
    const index = filterStatus.findIndex(item => item.status == req.query.status);
    filterStatus[index].class="active";
  }
  else{
    const index = filterStatus.findIndex(item => item.status =="");
    filterStatus[index].class="active";
  }
  if(req.query.status){
    find.status=req.query.status;
  }
  else{

  }


  const products = await Product.find(find);


  res.render('admin/pages/products/index', {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus:filterStatus
  });
}