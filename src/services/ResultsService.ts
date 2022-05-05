import { AxiosResponse } from "axios"
import { IColumnData } from "../interfaces/IColumnData"
import { IResults } from "../interfaces/IResults"
import { Api } from "../providers"


const ColumnResultsService = (data: IColumnData) => Api.post<IResults>('/test/post', data)

export const ResultsService = {
    ColumnResultsService,
}

