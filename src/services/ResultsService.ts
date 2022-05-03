import { IColumnData } from "../interfaces/IColumnData"
import { Api } from "../providers"


const ColumnResultsService = (data: IColumnData) => Api.post('/test/post', data)

export const ResultsService = {
    ColumnResultsService,
}

// export default async function getTest() {
    
//     console.log('aqui')
//     const result = await Api.get('/test')

//     return result
// }