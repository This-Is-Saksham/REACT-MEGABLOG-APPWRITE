import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  account;
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appwriteURL).setProject(conf.projectID);

    this.databases = Databases(this.client);
    this.bucket = Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.databaseID,
        conf.collectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite :: config :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
        return await this.databases.updateDocument(conf.databaseID, conf.collectionID, slug, {
            title,
            content,
            featuredImage,
            status,
          });
    } catch (error) {
        console.log("appwrite :: config :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.databaseID,
        conf.collectionID,
        slug
      )
      return true;
    } catch (error) {
        console.log("appwrite :: congif :: deletePost :: error", error);
        return false;
    }
  }
}

const service = new Service();
export default service;
