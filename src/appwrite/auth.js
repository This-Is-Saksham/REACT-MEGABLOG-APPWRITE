import conf from "../conf"
import { Client, Account, ID } from "appwrite";


export class AuthenticationService{

    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.projectID)
        this.account = new Account(this.client)
    }

    async createAccount({emailId, password, name}) {
        try {
        const userAccount = await this.account(ID.unique(), emailId, password, name) ;
        if(userAccount) {
            return this.login(emailId, password);
        } 
        } catch (error) {
            throw("AuthenticatonService :: createAccount :: Error", error);
        }
    }

    async login({emailId, password}) {
        try {
             return this.account.createEmailPasswordSession(emailId, password);
        } catch (error) {
            throw("AuthenticatonService :: createAccount :: Error");
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
    }
}

const authenticationService = new AuthenticationService();
export default authenticationService;
