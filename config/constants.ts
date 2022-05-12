import { tableColumnType } from "../interface/docsType";

export const API_URL = 'http://localhost:3000/'

export const TIMEOUT_VALUE = Number(process.env.NEXT_PUBLIC_TIMEOUT_VALUE) || 5000;

export const tableColumnsHeaders: tableColumnType[] = [
    {
        name: "Sr. No",
        value: "id",
        type: "field"
    },
    {
        name: "First name",
        value: "firstName",
        type: "field"
    },
    {
        name: "Last name",
        value: "lastName",
        type: "field"
    },
    {
        name: "Email",
        value: "email",
        type: "field"
    },
    {
        name: "Mobile",
        value: "mobile",
        type: "field"
    },
    {
        name: "View",
        value: "VIEW",
        type: "action"
    },
    {
        name: "Edit",
        value: "EDIT",
        type: "action"
    },
    {
        name: "Delete",
        value: "DELETE",
        type: "action"
    }
]