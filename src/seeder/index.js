import categorySeeder from "./category.js"
import productSeeder from "./product.js"

import mongoConnect from "../mongo/mongoConnecter.js"
async function seeder(){
    await mongoConnect()
    console.log("Start seeder category")
    await categorySeeder()
    console.log("Seeder category end")
    console.log("Start seeder product")
    await productSeeder()
    console.log("Seeder product end")
    process.exit(0)

}
seeder()