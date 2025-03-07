import categorySeeder from "./category.js"
import mongoConnect from "../mongo/mongoConnecter.js"
async function seeder(){
    await mongoConnect()
    console.log("Start seeder category")
    await categorySeeder()
    console.log("Seeder category end")
    process.exit(0)

}
seeder()