import firebase from 'firebase';
const createUser = async (email)=>{
    var firestore = firebase.firestore();
    var collection =firestore.collection('user')
    var doc = await firestore.collection('user').where('email','==',email).get();
    if(doc.docs.length==0)
    collection.add({
        email:email,
    });
    else
    window.localStorage.setItem('docid',doc.docs[0].ref.path);
}
const realTime = async (docid,callback)=>{
    var firestore = firebase.firestore();
    var doc = firestore.doc(docid);
    doc.collection("todos").onSnapshot((snap)=>{
        callback(snap);
        
    })
}
const all = async (docid)=>{
    var firestore = firebase.firestore();
    var doc = firestore.doc(docid);
   var docs = await doc.collection('todos').orderBy('datetime').get();
   return docs.docs;
}
const pending = async (docid)=>{
    var firestore = firebase.firestore();
    var doc = firestore.doc(docid);
   
   var docs = await doc.collection('todos').where('status','==','pending').orderBy('datetime').get();
 
   return docs.docs;
}
const completed = async (docid)=>{
    var firestore = firebase.firestore();
    var doc = firestore.doc(docid);
   var docs = await doc.collection('todos').where('status','==',"completed").orderBy('datetime').get();
   return docs.docs;
}
const updateDoc = async (docid,vals)=>{
    var firestore = firebase.firestore();
    var doc = firestore.doc(docid);
   doc.update({status:vals});
}
const deleteDoc = async (docid)=>{
    var firestore = firebase.firestore();
    var doc = firestore.doc(docid);
   doc.delete();

}
const createTodo = async (todos,email)=>{
    var firestore = firebase.firestore();
    var doc = await firestore.collection('user').where("email","==",email).get();
    var ref = doc.docs[0];
    ref.ref.collection("todos").add(todos);
}


export default {
    createUser:createUser,
    createTodo:createTodo,
  
    all:all,
    pending:pending,
    completed:completed,
    updateDoc:updateDoc,
    deleteDoc:deleteDoc,
    realTime:realTime,
};