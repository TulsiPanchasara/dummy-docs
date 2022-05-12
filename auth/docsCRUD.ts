import { docsType } from "../interface/docsType";

export const addEditDoc = (data: docsType, edit?: boolean) => {
    let addEditDone = false;
    if (typeof window !== 'undefined') {
        let updatedData = getAllDocs();

        if (updatedData) {
            if (edit) {
                let currentIndex = updatedData.findIndex((u) => u.id === data.id);
                updatedData[currentIndex] = data;
            }
            else {
                updatedData.push(data);
            }
            window.localStorage.setItem('my_docs', JSON.stringify(updatedData));
            addEditDone = true;
        }
    }
    return addEditDone;
}

export const getAllDocs = () => {
    let allDocs: docsType[] = []
    if (typeof window !== 'undefined') {
        let docs = window.localStorage.getItem('my_docs');
        if (docs) {
            let parsedDocs = JSON.parse(docs);
            allDocs = parsedDocs
        }
    }
    return allDocs
}

export const deleteDoc = (id: number) => {
    let isDeleteDone = false;
    if (typeof window !== 'undefined') {
        let allDocs = getAllDocs();
        let index = allDocs.findIndex((a) => a.id === id);

        let updatedDocs = allDocs.length === 1 ? [] : allDocs.splice(index, 1);

        window.localStorage.setItem('my_docs', JSON.stringify(updatedDocs));
        isDeleteDone = true;
    }
    return isDeleteDone;
}

export const getDataById = (id: number) => {
    let currentData: docsType | undefined;
    if (typeof window !== 'undefined') {
        let allDocs = getAllDocs();
        let foundData = allDocs.find((a) => a.id === id);

        if (foundData) {
            currentData = foundData;
        }
    }

    return currentData;
}