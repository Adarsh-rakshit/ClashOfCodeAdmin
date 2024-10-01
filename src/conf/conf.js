const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollections: {
        OrgCollectionId: String(import.meta.env.VITE_APPWRITE_ORG_COLLECTION_ID),
        ContestCollectionId: String(import.meta.env.VITE_APPWRITE_CONTEST_COLLECTION_ID),
    },
    appwriteBuckectId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
};

export default conf;
