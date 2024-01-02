const mongoose = require("mongoose");
const Customer = require("../models/Customer")


// customer route

exports.homepage = async (req,res)=>{
    const messages = await req.flash("info");
    let perPage = 12;
    let page = req.query.page || 1;
    const locals = {
        title:"Node JS",
        description: "User Management System"
    }
    try {
        const customers = await Customer.aggregate([{$sort:{createdAt:-1}}])
        .skip(perPage *page-perPage)
        .limit(perPage)
        .exec();
        const count = await Customer.countDocuments({});
        res.render("index", {
            locals,
            customers,
            current: page,
            pages: Math.ceil(count / perPage),
            messages,
          });
    } catch (error) {
       console.log(error) 
    }
    
}
exports.addCustomer = async (req,res)=>{

    const locals = {
        title:"Node JS",
        description: "User Management System"
    }
    res.render("customer/add",{locals});
}
exports.postCustomer = async (req,res)=>{
    const newCustomer = {
        firstName : req.body.firstName,
        lastName:req.body.lastName,
        tel:req.body.tel,
        email:req.body.email,
        details:req.body.details
    }
    try {
        await Customer.create(newCustomer);
        await req.flash("info", "New customer has been added.");
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
}

exports.viewCustomer = async (req,res)=>{
    try {
        const locals = {
            title:"View Customer",
            description: "User Management System"
        }
        const customer = await Customer.findOne({_id:req.params.id });
        res.render("customer/view",{
            locals,
            customer
        })
    } catch (error) {
        console.log(error)
    }
}

exports.edit = async (req,res)=>{
    try {
        const locals = {
            title:"View Customer",
            description: "User Management System"
        }
        const customer = await Customer.findOne({_id:req.params.id });
        res.render("customer/edit",{
            locals,
            customer
        })
    } catch (error) {
        console.log(error)
    }
}
exports.editPost = async (req,res)=>{
   try {
    await Customer.findByIdAndUpdate(req.params.id,{
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        tel : req.body.tel,
        email : req.body.email,
        details : req.body.details,
        updatedAt : Date.now()
    });
   await res.redirect(`/view/${req.params.id}`)
    // res.redirect("/")
   } catch (error) {
    console.log(error)
   }
}

exports.deletePost = async (req,res)=>{
    
    try {
        await Customer.deleteOne({ _id:req.params.id});
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
}

exports.search = async (req,res)=>{
    const locals = {
        title:"View Customer",
        description: "User Management System"
    }
    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
    
        const customers = await Customer.find({
          $or: [
            { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
            { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
          ],
        });
    
        res.render("search", {
          customers,
          locals,
        });
      } catch (error) {
        console.log(error);
      }
}