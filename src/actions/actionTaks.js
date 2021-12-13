import { collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import { types } from '../types/types'
import Swal from 'sweetalert2'
import { loadTaks } from '../helpers/loadTaks '


export const TaksNew = (taks) => {
    return async (dispatch, getSate) => {
        const id = getSate().login.id
        console.log(id);
        const newCard = {
            url: taks.url,
            nombre: taks.nombre,
            description: taks.description
        }

        await addDoc(collection(db, `${id}/taks/data`), newCard);
        dispatch(addNewTaks(newCard))
    }
}

export const addNewTaks = (taks) => ({
    type: types.taksAddNew,
    payload: {
        ...taks
    }
})


//Listar
export const Listar = (uid) => {
    return async (dispatch) => {
        const cards = await loadTaks(uid)
        dispatch(setTaks(cards))
    }
}

export const setTaks = (taks) => {
    return {
        type: types.taksLoad,
        payload: taks
    }
}

//Actualizar 
export const activeTaks = (id, taks) => {
    return {
        type: types.taksActive,
        payload: {
            id,
            ...taks
        }
    }
}

export const Edit = (taks) => {
    return async (dispatch, getState) => {
        const id = getState().login.id;
        console.log(taks)

        const EditCard = {
            url: taks.url,
            nombre: taks.nombre,
            description: taks.description
        }

        const cardFire = { ...EditCard }
        delete cardFire.id

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait ...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading()
            }
        })

        const docRef = await doc(db, `${id}/taks/data/`, `${taks.id}`);
        console.log(docRef)
        // Update the timestamp field with the value from the server
        const updateTimestamp = await updateDoc(docRef, {
            url: taks.url,
            nombre: taks.nombre,
            description: taks.description
        });

        Swal.fire('Saved', taks.nombre, 'success');
        dispatch(Listar(id))
    }
}

export const Delete = (id) => {
    return async (dispatch, getState) => {

        const uid = getState().login.id;
        await deleteDoc(doc(db, `${uid}/taks/data/`, `${id}`));


        dispatch(deleteTaks(id));
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Delete',
            showConfirmButton: false,
            timer: 1500
        })
        dispatch(Listar(uid))
    }
}

export const deleteTaks = (id) => ({
    type: types.taksDelete,
    payload: id
});