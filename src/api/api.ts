import { useGlobalState } from "../contexts/global-state";
import { GetDepartmentsResponseData } from "../types/departments";
import { GetObjectsResponseData, MetObject } from "../types/objects";

const baseUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/'

const get = async (url: string): Promise<{
    isSuccess: boolean,
    data: any,
    message?: string
}> => {
    useGlobalState.getState().incrementLoadingCount();

    const response = await fetch(baseUrl + url, { method: 'get' });
    const data = JSON.parse(await response.text())

    useGlobalState.getState().decrementLoadingCount();

    return {
        isSuccess: response.status == 200,
        message: data.message,
        data: data,
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
    let url = 'objects';
    if ((params.metadataDate) || (params.departmentIds && (params.departmentIds.length > 0))) {
        url += '?';
        if (params.metadataDate) {
            url += 'metadataDate=' + params.metadataDate;
        }
        if (params.departmentIds && (params.departmentIds.length > 0)) {
            if (params.metadataDate) {
                url += '&';
            }
            url += 'departmentIds=' + params.departmentIds.join('|');
        }
    }
    const response = await get(url);

    return {
        ...response,
        data: response.data as GetObjectsResponseData
    }
}

export const getDepartments = async () => {
    const response = await get(`departments`);
    
    return {
        ...response,
        data: response.data as GetDepartmentsResponseData
    }
} 