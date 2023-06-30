const Product = require('../models/product');

// function to show all the products
module.exports.products = function(req, res){
    Product.find({}, function(err, foundProducts){
        if(err){
            res.send(err);
        }else{
            console.log("this is the found product",foundProducts);
            res.send(foundProducts);
        }
    });
}

// function to create a new product
module.exports.create = function(req, res){
    console.log("this is the data recieved ",req.body);
    const newProduct =  Product.create({

        name: req.body.name,

        quantity: req.body.quantity

    },function(err,newProduct){
        console.log("product created")
        if(err){
            return res.send(err)
        }
        return res.status(200).json({
            message:"product created",
            newProduct:newProduct
        })
    });
   
}

// function to delete a product using it's ID
module.exports.delete = function(req, res){
    Product.deleteOne(
        {_id: req.params.productID},
        function(err){
            if(err){
                res.send(err);
            }else{
                res.send({
                    message: "Product deleted"
                });
            }
        });
}

// function to update a product's quantity
module.exports.updateQunatity = function(req, res){
    const ID = req.params.productID;
    // find the product using id
    Product.findById(ID, function(err, found){
        if(err){
            res.send(err);
        }else{

            // Note - To increment the quantity of the product put number as a positive value in the query 
            //        and to decrement the quantity put the number as negative value in the query

            const newQty = parseInt(found.quantity) + parseInt(req.query.number);
            // update the product's quantity
            Product.findByIdAndUpdate(ID, {quantity: newQty}, function(err, updatedProduct){
                if(err){
                    res.send(err);
                }else{
                    updatedProduct.quantity = newQty;
                    res.send({
                        product: updatedProduct,
                        message: 'updated successfully'
                    });
                }
            });
        }
    });
}