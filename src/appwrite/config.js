import conf from '../conf/conf.js';
import {Client,Databases,Storage,Query,ID} from "appwrite";
/*
catch(error){
    console.log("Appwrite Database Service :: "+ " :: " + error);
}
*/
export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async getContests(startDate,EndDate){
        try{
            const queries = [Query.and([Query.lessThanEqual("Schedule",EndDate)],[Query.greaterThanEqual("Schedule",startDate)])];
            return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollections.ContestCollectionId,queries);
        }
        catch(error){
            console.log("Appwrite Database Service :: "+ "getContests :: " + error);
        }
    }
    async createContest({ContestName,Schedule,ContestURL,DifficultyLevel,OrganisationID,Duration}){
        try{
            return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollections.ContestCollectionId,ID.unique(),
                {ContestName,Schedule,ContestURL,DifficultyLevel,OrganisationID,Duration}
            );
        }
        catch(error){
            console.log("Appwrite Database Service :: "+ "createContest :: " + error);
        }
    }
    async deleteContest(slug){
        try{
            await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollections.ContestCollectionId,slug);
            return true;
        }
        catch(error){
            console.log("Appwrite Database Service :: "+ "deleteContest :: " + error);
            return false;
        }
    }
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBuckectId,
                ID.unique(),
                file
            );
        }
        catch(error){
            console.log("Appwrite Storage Service :: "+ "uploadFile :: " + error);
            return false;
        }
    }
    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBuckectId,
                fileId
            );
        } catch (error) {
            console.log("Appwrite Storage Service :: "+ "deleteFile :: " + error);
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBuckectId,
            fileId
        ).href;
    }
    async createOrg({OrgName,fileId,orgUrl}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollections.OrgCollectionId,
                ID.unique(),
                {
                    OrgName,fileId,orgUrl 
                }
            );
        }
        catch(error){
            console.log("Appwrite Storage Service :: "+ "CreateOrg :: " + error);
            return false;
        }
    }
    async getOrg(fileId){
        try {
            return await this.databases.getDocument(
                conf.appwriteBuckectId,
                conf.appwriteCollections.OrgCollectionId,
                fileId
            );
        } catch (error) {
            console.log("Appwrite Storage Service :: "+ "getOrg :: " + error);            
            return false;
        }
    }
    async getAllOrgs() {
        try {
            const mydata = await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollections.OrgCollectionId);
            console.log('Fetched Organizations:', mydata);  // This should show the list of organizations
            return mydata;
        } catch (error) {
            console.log("Appwrite Storage Service :: getOrg :: " + error);
            return false;
        }
    }
}

const appwriteService = new Service();
export default appwriteService;