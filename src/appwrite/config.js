import { Service } from 'appwrite/types/service'
import {conf} from '../conf/conf'
import { ID , Client , Databases , Storage , Query } from 'appwrite'


export class Servise{

 client = new Client;
Databases;
bucket;
constructor(){
this.client
.setEndpoint(conf. appwriteUrl)
.setProject(conf.appwriteProjectId)
this.databases = new Databases(this.client)
this.storage = new Storage(this.client)
}

//create post methord defined in the class
   async createPost({title, slug , content , featuredimage , status , userid})
   {
    try {
         const result = await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredimage,
                status,
                userid
            }
            
        )
        return result
    } catch (error) {
       console.log("ERROR IN CREATEPOST", error) 
    
    }
   }

//update document 

async updatePost(slug,{title, featuredimage,content, status}){
    try {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
               title, 
               content,
               featuredimage,
               status
            }
        )
    } catch (error) {
        console.log("ERROR IN UPDATE POST",error)
    }
}

//delete post 
async deletePost({slug}){
   try {
    await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
    )
    return true;
   } catch (error) {
    console.log("ERROR IN DELETE POST",error)
   }
}

//get document 
 async getPost ({slug}){
    try {
        return await this.databases.listDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
    } catch (error) {
        console.log("ERROR IN getPOST",error)
        
    }
 }

//get all documents
async getPosts (queries = [Query.equal("status",["Active"])])
{
    try {
        await this.databases.listDocuments(
       conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
        )
        
    } catch (error) {
        console.log("ERROR IN getPosts",error)
    }
}

//upload files 
async uploadFile(file){
    try {
        return this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("ERROR IN UPLOADFILE", error)
        return(false)
    }
}

//download file
async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
        )
        return(true)
    } catch (error) {
        console.log("ERROR IN DELETE FILE , error")
        return(false)
    }
}

getfilePreview(fileId){
    try {
        return this.bucket.getfilePreview(
            conf.appwriteBucketId,
            fileId
        )
    } catch (error) {
       console.log("ERROR IN GETFILEPREVIEW",error) 
    }
}

}
 
const servise = new Service();
export default servise