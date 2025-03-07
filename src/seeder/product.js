import ProductModel from "../models/productModel.js";
import CategoryModel from "../models/categoryModel.js";
const data = [
    {
        code :"ATD_001",
        name: "Áo Nam",
        price: 1000000,
        images: "product-2.jpg",
        searchString: "ao nam, ao thun tay dai nam",
        size:["S","M","L"],
        color: ["#ff44ff", "#3355ff", "#aaff33"],
        active: true,
        description: "is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make",
        information: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make",
        categoryCode:"A_001",
        createAt: new Date(),
    },
    {
        code: "MA_001",
        name: "Máy ảnh cơ",
        price: 2000000,
        images: "product-1.jpg",
        searchString: "may anh",
        // size: ["S", "M", "L"],
        color: ["#ff44ff", "#3355ff", "#aaff33"],
        active: true,
        description: "is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make",
        information: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make",
        categoryCode: "MA_001",
        createAt: new Date(),
    }, 
    {
        code: "GIAY_001",
        name: "Giày nam",
        price: 3000000,
        images: "product-4.jpg",
        searchString: "giay nam",
        size: ["S", "M", "L"],
        color: ["#ff44ff", "#3355ff", "#aaff33"],
        active: true,
        description: "is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make",
        information: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make",
        categoryCode: "G_001",
        createAt: new Date(),
    },
    {
        code: "MP_001",
        name: "Mỹ phẩm",
        price: 5000000,
        images: "product-8.jpg",
        searchString: "my pham",
        size: ["S", "M", "L"],
        active: true,
        description: "is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make",
        information: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make",
        categoryCode: "MP_001",
        createAt: new Date(),
    },
]
export default async function categorySeeder(){
    await ProductModel.deleteMany()
    const categories = await CategoryModel.find({})
    let writeProduct = []
    for(let product in data){
        const { categoryCode, ...dataOther} = data[product]
        const category = categories.find(categoryItem =>{
            return categoryItem.code === categoryCode
        })
        writeProduct.push({
            categoryId: !!category ? category._id : null,
            ...dataOther
        })
    }
    await ProductModel.insertMany(writeProduct)
}