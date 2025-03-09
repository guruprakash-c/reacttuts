import { Client, Databases, Query, ID, Permission, Role } from "appwrite";
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;


const client = new Client()
    .setEndpoint('https://cloude.appwrite.io/v1')
    .setProject(PROJECT_ID);

const database = new Databases(client)

export const updateSearchCount = async (searchTerm, movie) =>{
    // i. Use Appwrite SDK to check for the search term exists in the database 
    try{
        const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
            Query.equal('searchTerm', searchTerm),
        ]);
        // ii. If exists then update the count 
        if(result.documents.length > 0){
            const doc = result.documents[0];
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1
            },[
                Permission.read(Role.any()),
            ]); 

        } else {
        // iii. If not exist, create a document with search term and set count as 1 
         await database.createDocument(DATABASE_ID,COLLECTION_ID, ID.unique(), {
            searchTerm,
            count: 1,
            movie_id: movie.id,
            poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
         }, [
            Permission.read(Role.any()),
         ]) 
        }


    }catch(err){
        console.error(err);
    }
}

export const getTrendingMovies = async () =>{
    debugger;
    try{
        const results = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count')
        ]).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
        return results.documents;
    }catch(err){
        console.log(err);
    }
}