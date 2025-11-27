export type GetDepartmentsResponseData = {
    departments: Department[]
}

export type Department = {
        departmentId: number,
        displayName: string
}