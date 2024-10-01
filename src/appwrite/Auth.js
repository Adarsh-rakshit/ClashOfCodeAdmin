import conf from "../conf/conf.js"
import {Client,Account, ID} from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }
        catch(error){
            console.log("Appwrite Service :: "+ "login :: " + error);
            throw error;
        }
    }
    async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(error){
            console.log("Appwrite Service :: "+ "getCurrentUser :: " + error);
            throw error;
        }
    }
    async logout(){
        try{
            return await this.account.deleteSessions();
        }
        catch(error){
            console.log("Appwrite Service :: logoutFunc :: "+ error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;