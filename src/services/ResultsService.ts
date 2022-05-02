import { Api } from "../providers"



const ColumnResultsService = async(data: any) => await Api.post('/test/post', data).then((resposne) => resposne).catch((err) => console.log(err)) 

export const ResultsService = {
    ColumnResultsService,
}

// export default async function getTest() {
    
//     console.log('aqui')
//     const result = await Api.get('/test')

//     return result
// }