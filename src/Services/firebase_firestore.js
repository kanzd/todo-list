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
const getProjects = async (docid)=>{
    var firestore = firebase.firestore();
    var doc = firestore.doc(docid);
    var dataref = await doc.get();
    var data = dataref.data();
    return data;
}
const createProject = async (docid,projectName,about)=>{
    var firestore = firebase.firestore();
    var doc =  firestore.doc(docid);
    await doc.update({
        [projectName]:about
    });
   
}
const realTime = async (docid,projectName,callback)=>{
    var firestore = firebase.firestore();
    var doc = firestore.doc(docid);
    doc.collection(projectName).onSnapshot((snap)=>{
        callback(snap);
        
    })
}
const all = async (docid,projectName)=>{
    var firestore = firebase.firestore();
    var doc = firestore.doc(docid);
   var docs = await doc.collection(projectName).orderBy('datetime').get();
   return docs.docs;
}
const pending = async (docid,projectName)=>{
    var firestore = firebase.firestore();
    var doc = firestore.doc(docid);
   
   var docs = await doc.collection(projectName).where('status','==','pending').orderBy('datetime').get();
 
   return docs.docs;
}
const completed = async (docid,projectName)=>{
    var firestore = firebase.firestore();
    var doc = firestore.doc(docid);
   var docs = await doc.collection(projectName).where('status','==',"completed").orderBy('datetime').get();
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
const createTodo = async (todos,email,projectName)=>{
    var firestore = firebase.firestore();
    var doc = await firestore.collection('user').where("email","==",email).get();
    var ref = doc.docs[0];
    ref.ref.collection(projectName).add(todos);
}


export default {
    createUser:createUser,
    createTodo:createTodo,
    createProject:createProject,
    getProjects:getProjects,
    all:all,
    pending:pending,
    completed:completed,
    updateDoc:updateDoc,
    deleteDoc:deleteDoc,
    realTime:realTime,
};