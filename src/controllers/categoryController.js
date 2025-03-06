import CategoryModel from "../models/categoryModel.js"
import mongoose from "mongoose"
import { ObjectId } from "mongodb"
import { removeVietnameseAccents } from "../common/index.js"
const sortObjects =[
    {code: "name_DESC", name: "Tên giảm dần"},
    {code: "name_ASC", name: "Tên tăng  dần"},
    {code: "code_DESC", name: "Mã giảm dần"},
    {code: "code_ASC", name: "Mã tăng dần"},
 
]
export async function listCategory(req, res) {
    const search = req.query?.search
    const pageSize = !!req.query.pageSize ? parseInt(req.query.pageSize) : 5
    const page = !!req.query.page ? parseInt(req.query.page) : 1
    const skip = (page - 1) * pageSize
    const sort = !!req.query.sort ? req.query.sort : null

    let filters ={
        deleteAt: null,
    }
    if(search && search.length > 0){
        filters.searchString = {$regex:removeVietnameseAccents(search), $options:"i"}
    }
    try {
        const countCategories = await CategoryModel.countDocuments(filters)
        const categories = await CategoryModel.find(filters).skip(skip).limit(pageSize).sort(sort)
        res.render("pages/categories/list", {
            title: "Categories",
            categories: categories,
            countPagination: Math.ceil(countCategories/pageSize),
            page: page,
            pageSize: pageSize,
            sortObjects,
            sort: sort,
        })
    } catch (error) {
        console.log(error)
        res.send("Hien tai khong co san pham")
    }
}
//tao
export async function renderPageCreateCategory(req, res) {
    res.render("pages/categories/form", {
        title: "Create Categories",
        mode: "Create",
        category: {},
        err: {},
    })
}

export async function createCategory(req, res) {
    const data= req.body
    try {
        const category = await CategoryModel.findOne({code : data.code, deleteAt:null})
        if(category){
            throw("code")
        }
        await CategoryModel.create({
            ...data, createAt: new Date,
        })
        res.redirect("/categories")
    } catch (error) {
        console.log("error", error)
        let err = {}
        if(error === "code"){
            err.code = "Mã sản phẩm này đã tồn tại"
        }
        if(error.name === "ValidationError"){
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message
            })
        }
        console.log("err",err)
        res.render("pages/categories/form", {
            title: "Create Categories",
            mode: "Create",
            category: {...data},
            err
        })
    }
}

//cap nhat
export async function renderPageUpdateCategory(req, res) {
    try {
        const { id,} = req.params
        const category = await CategoryModel.findOne({ _id: new ObjectId(id), deleteAt: null })
        if (category) {
            res.render("pages/categories/form", {
                title: "Create Categories",
                mode: "Update",
                category: category,
                err: {},
            })
        } else {
            res.send("Hiện không có sản phẩm nào phù hợp!")
        }
    } catch (error) {
        res.send("Trang web này không tồn tại")
    }
    
}
export async function updateCategory(req, res) {
    const { ...data } = req.body
    const { id, } = req.params

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
        res.render("pages/categories/form" , {
            title: "Update Categories",
            mode: "Update",
            category: { ...data, _id: id },
            err
        })
    }
}

//delete
export async function renderPageDeleteCategory(req, res) {
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
export async function deleteCategory(req, res) {
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