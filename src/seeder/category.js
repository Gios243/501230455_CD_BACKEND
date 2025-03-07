import CategoryModel from "../models/categoryModel.js";
const data = [
    {
        code :"A_001",
        name: "Áo ",
        image: "cat-1.jpg",
        searchString: "ao nu",
        createAt: new Date(),
    },
    {
        code: "MA_001",
        name: "Máy ảnh",
        image: "cat-2.jpg",
        searchString: "may anh",
        createAt: new Date(),
    },
    {
        code: "G_001",
        name: "Giày ",
        image: "cat-3.jpg",
        searchString: "giay nam",
        createAt: new Date(),
    },
    {
        code: "MP_001",
        name: "Mỹ phẩm",
        image: "cat-4.jpg",
        searchString: "my pham",
        createAt: new Date(),
    },
]
export default async function categorySeeder(){
    await CategoryModel.deleteMany()
    await CategoryModel.insertMany(data);
}