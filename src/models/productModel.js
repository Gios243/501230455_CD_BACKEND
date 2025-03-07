import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
    code: {
        type: String,
        required: [true, "Bắt buộc phải nhập mã sản phẩm"],
    },
    name: {
        type: String,
        required: [true, "Bắt buộc phải nhập tên sản phẩm"],

    },
    price: {
        type: Number,
        required: [true, "Bắt buộc phải nhập giá sản phẩm"],

    },
    searchString: {
        type: String,
        required: [true, "Bắt buộc phải nhập chuỗi tìm kiếm"],
    },
    images: [String],
    sizes: {
        type:[String],
        enum:["S","M","L","XL"],
    },
    colors: {
        type: [String],
        enum: ["red", "green", "yellow", "white", "black"],
    },
    active: String,
    description: String,
    information: String,
    categoryId: Schema.Types.ObjectId,
    createAt: Date,
    updateAt: Date,
    deleteAt: Date,
}, {
    versionKey: false,
    collection: "products",
    toJSON: {virtuals: true},
    toObject: {virtuals:true}
})
productSchema.virtual("category",{
    ref:"Category",
    localField:"categoryId",
    foreignField: "_id",
    justOne:    true
})  

const ProductModel = mongoose.model("product", productSchema)
export default ProductModel;