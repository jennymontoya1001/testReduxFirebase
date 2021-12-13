import { db } from '../firebase/firebaseConfig'
import { getDocs, collection } from 'firebase/firestore'


export const loadTaks = async (id) => {
    console.log('hola',id)
    const querySnapshot = await getDocs(collection(db,`${id}/taks/data/`));
    const cardsList = [];
    
    querySnapshot.forEach(hijo=>{
        cardsList.push({
        id:hijo.id,
        ...hijo.data()
       })
    })


    return cardsList
}

