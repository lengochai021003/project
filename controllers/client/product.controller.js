const Product = require("../../model/product.model");


module.exports.index= async(req, res) => {
    const products= await Product.find({
        deleted: false
    })
    products.forEach(item=>{
        item.newPrice= (item.price*(100-item.discountPercentage)/100).toFixed(2);
    })
    res.render('client/pages/products/index',{
        pageTitle:"Danh sách sản phẩm",
        products: products
    });
}