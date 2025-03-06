import mongoose from "mongoose";
const {Schema} = mongoose;

const categorySchema = new Schema({
    code:{ 
        type:String,
        required:[true,"Bắt buộc phải nhập mã loại sản phẩm"],
        minlength:[5,"Mã loại sản phẩm có độ dài từ 5 - 10 ký tự"],
        maxlength:[10, "Mã loại sản phẩm có độ dài từ 5 - 10 ký tự"],
    },
    name: { 
        type:String, 
        required: [true, "Bắt buộc phải nhập tên sản phẩm"],

    }, 
    image:{
        type:String,
        required: [true, "Bắt buộc phải nhập hình ảnh sản phẩm"],
        
    },
    searchString:{
        type: String,
        required: [true, "Bắt buộc phải nhập chuỗi tìm kiếm"],
    },
    createAt:Date,
    updateAt:Date,
    deleteAt:Date,
},{
    versionKey: false,
    collection:"categories"
})

const CategoryModel = mongoose.model("Category", categorySchema)

export default CategoryModel;