import { useGlobalState } from "../contexts/global-state";
import { GetDepartmentsResponseData } from "../types/departments";
import { GetObjectsResponseData, MetObject, MetSearchParams } from "../types/objects";
import { toQueryString } from "../utils/helper-functions";

const baseUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/'

const get = async (url: string): Promise<{
    isSuccess: boolean,
    data: any,
    message?: string
}> => {
    useGlobalState.getState().incrementLoadingCount();

    const response = await fetch(baseUrl + url, { method: 'get' });
    console.log(response.status)

    useGlobalState.getState().decrementLoadingCount();

    if (response.status == 200) {
        const data = JSON.parse(await response.text());

        return {
            isSuccess: response.status == 200,
            message: data.message,
            data: data,
        }
    }
    else {
        return {
            isSuccess: false,
            message: '',
            data: undefined,
        }
    }
}


export const getDepartments = async () => {
    const response = await get(`departments`);

    return {
        ...response,
        data: response.data as GetDepartmentsResponseData
    }
}


export const getMetObject = async (id: string) => {
    const response = await get(`objects/${id}`);
    return {
        ...response,
        data: response.data as MetObject
    }
}


export const getMetObjects = async (params: {
    metadataDate?: string,
    departmentIds?: number[]
}) => {
    let url = 'objects' + toQueryString(params);
    const response = await get(url);

    return {
        ...response,
        data: response.data as GetObjectsResponseData
    }
}

export const getMetObjectsWithTheIds = async (params: {
    objectIds: number[]
}) => {
    console.log('api.ts - getMetObjectsWithTheIds - objectIds:', params.objectIds);
    const promises = Promise.all(params.objectIds.map(async id => {
        const response = await getMetObject(id.toString());
        if (response.isSuccess) {
            return response.data;
        }
        else {
            return undefined;
        }
    }));
    const response = await promises;
    console.log('response:', response);
    return response?.filter(i => !!i);
}

export const searchMetObjects = async (params: MetSearchParams) => {
    let url = 'search' + toQueryString(params);
    console.log('api.ts - searchMetObjects - url:', url, '- params:', params);
    const response = await get(url);
    console.log('response:', response);
    
    return {
        ...response,
        data: response.data as GetObjectsResponseData
    }
}