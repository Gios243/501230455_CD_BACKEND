import ProductModel from "../models/productModel.js"
import CategoryModel from "../models/categoryModel.js"
import { ObjectId } from "mongodb"
import { removeVietnameseAccents } from "../common/index.js"
const sortObjects =[
    {code: "name_DESC", name: "Tên giảm dần"},
    {code: "name_ASC", name: "Tên tăng  dần"},
    {code: "code_DESC", name: "Mã giảm dần"},
    {code: "code_ASC", name: "Mã tăng dần"},
 
]

const sizes =["S","M","L","XL"]
const colors = ["red","green","yellow","white","black"]


export async function listProduct(req, res) {
    const search = req.query?.search
    const pageSize = !!req.query.pageSize ? parseInt(req.query.pageSize) : 5
    const page = !!req.query.page ? parseInt(req.query.page) : 1
    const skip = (page - 1) * pageSize
    let sort = !!req.query.sort ? req.query.sort : null

    let filters ={
        deleteAt: null,
    }
    if(search && search.length > 0) {
        filters.searchString = {$regex:removeVietnameseAccents(search), $options:"i"}
    }
    if(!sort){
        sort = { createAt: -1}
    }else{
        const sortArray = sort.split('_')
        sort = {[sortArray[0]]: sortArray[1] === "ASC"? -1 : 1}
    }
    try {
        const countProduct = await ProductModel.countDocuments(filters)
        const products = await ProductModel.find(filters).populate("category").skip(skip).limit(pageSize).sort(sort)
        res.render("pages/products/list", {
            title: "Product",
            products: products,
            countPagination: Math.ceil(countProduct/pageSize),
            page: page,
            pageSize: pageSize,
            sortObjects,
            sort,
        })
    } catch (error) {
        console.log(error)
        res.send("Hien tai khong co san pham")
    }
}
//tao
export async function renderPageCreateProduct(req, res) {
    const categories = await CategoryModel.find({deleteAt: null})
    res.render("pages/products/form", {
        title: "Create Products",
        mode: "Create",
        product: {},
        sizes: sizes,
        categories: categories,
        colors: colors,
        err: {},
    })
}

export async function createProduct(req, res) {
    const categories = await CategoryModel.find({ deleteAt: null })
    const { sizes: productSize,color:productColors,image,...dataOther} = req.body;
    console.log("dataOther", dataOther)
    let sizeArray = [], colorsArray = [],imageArray = [image]
    if (typeof productSize === "string") {
        sizeArray = [productSize]
    }
    if (typeof productSize === "object") {
        sizeArray = productSize
    }
    if (typeof productColors === "string") {
        colorsArray = [productColors]
    }
    if (typeof productColors === "object") {
        colorsArray = productColors
    }
    try {
        

        const product = await ProductModel.findOne({code : dataOther.code, deleteAt:null})
        if (product){
            throw("code")
        }
        await ProductModel.create({
            sizes: sizeArray,
            colors: colorsArray,
            images: imageArray,
            ...dataOther, createAt: new Date,
            

        })
        res.redirect("/products")
    } catch (error) {
        console.log("err", error)
        let err = {}
        if(error === "code"){
            err.code = "Mã sản phẩm này đã tồn tại"
        }
        if(error.name === "ValidationError"){
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message
            })
        }
        res.render("pages/products/form", {
            title: "Create Products",
            mode: "Create",
            product: {
                sizes: sizeArray,
                colors: colorsArray,
                ...dataOther 
            },
                sizes: sizes,
                colors: colors,
                categories: categories,
            err
        })
    }
}


//cap nhat
export async function renderPageUpdateProduct(req, res) {
    try {
        const categories = await CategoryModel.find({ deleteAt: null })
        const { id,} = req.params
        const product = await ProductModel.findOne({ _id: new ObjectId(id), deleteAt: null })
        if (product) {
            res.render("pages/products/form", {
                title: "Update Product",
                mode: "Update",
                product:product,
                sizes: sizes,
                colors: colors,
                categories: categories,
                err: {},
            })
        } else {
            res.send("Hiện không có sản phẩm nào phù hợp!")
        }
    } catch (error) {
        console.log("error", error)
        console.log("Update không thành công")
    }
    
}
export async function updateProduct(req, res) {
    const { ...data } = req.body
    const { id, } = req.params
    console.log

    try {
        const category = await CategoryModel.findOne({ code: data.code, deleteAt: null })
        if (category) {
            throw ("code")
        }
        await CategoryModel.updateOne(
            { _id: new ObjectId(id) },
            {
                ...data,
                updateAt: new Date(),
            })
        res.redirect("/categories")
    } catch (error) {
        console.log("error", error)
        let err = {}
        if (error === "code") {
            err.code = "Mã sản phẩm này đã tồn tại"
        }
        if (error.name === "ValidationError") {
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message
            })
        }
        console.log("err", err)
        res.render("pages/categories/form", {
            title: "Update Categories",
            mode: "Update",
            category: { ...data, _id:id },
            err
        })
    }
}

//delete
export async function renderPageDeleteProduct(req, res) {
    try{
        const { id } = req.params
        const category = await CategoryModel.findOne({ _id: new ObjectId(id), deleteAt: null })
        if (category) {
            res.render("pages/categories/form", {
                title: "Create Categories",
                mode: "Delete",
                category: category,
                err: {},

            })
        } else {
            res.send("Hiện không có sản phẩm nào phù hợp!")
        }
    }
    catch (error) {
        console.log(error)
        res.send("Trang web này không tồn tại")
    } 
}
export async function deleteProduct(req, res) {
    const { id } = req.body
    try {
        await CategoryModel.updateOne(
            { _id: new ObjectId(id) },
            {
                deleteAt: new Date(),
            })
        res.redirect("/categories")
    } catch (error) {
        console.log(error)
        res.send("Xóa sản phẩm không thành công!")
    }
}