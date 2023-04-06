import Admin from "../models/Admin.js"
import bcrypt from "bcrypt"
import '../dbConnect.js'
const createAdmin = async ()=>{
    try {
        const password = await bcrypt.hash('Admin@123',12)
        const admin = new  Admin({
            email : 'admin@123gmail.com',
            password,
            role : 'admin'
        })
        await admin.save()
        console.log('admin created')
    } catch (error) {
        console.log(error)
    }
}
createAdmin()