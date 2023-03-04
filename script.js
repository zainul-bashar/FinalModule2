const createBlogButton = document.querySelector('#btn');
const inputHeading = document.querySelector('input');
const textArea = document.querySelector('textarea');
const buttonPublish = document.querySelector('#btn-post');
const buttonCancel = document.querySelector('#btn-cancel');
const modal = document.querySelector('.mymodal');
const divShowData = document.querySelector('#add-data');
const span = document.querySelector('.close');
const modalContent = document.querySelector('.modal-content');
let blogs = [];
//delete blog using delete button
function deletBlog(event){
    const deleteElement = event.target;
    console.log(deleteElement);
    const deleteId = deleteElement.index;
    blogs = blogs.filter((value)=>value.index != deleteId);
    
}
//run edit function//
function EditBlog(event){
    divShowData.textContent = "";
     const btnElement = event.target;
     const id = btnElement.index;
     //console.log(id);
    modal.classList.remove('hide');

    inputHeading.value = blogs[id].heading;
    textArea.value = blogs[id].paragraph;
    
}
//creating div and more elements to show the details on the page//
 function createDiv(object,index){
    modal.classList.add('hide');
    const div = document.createElement('div');
    div.setAttribute('class','div-class');
    const h2 = document.createElement('h2');
    h2.textContent = object.heading;
    const pBlog = document.createElement('p');
    pBlog.textContent = object.paragraph;
    const buttonEdit = document.createElement('button');
    buttonEdit.textContent = 'Edit Post';
    buttonEdit.index = index;
    //clicking on edit button//
    buttonEdit.addEventListener('click',EditBlog);

    const buttonDelete = document.createElement('button');
    buttonDelete.setAttribute('class','btn-delete');
    buttonDelete.textContent = 'Delete Post';
    buttonDelete.index = index;
    //clicking on delete button//
    buttonDelete.addEventListener('click',deletBlog);
    
    const pTime = document.createElement('span');
    pTime.setAttribute('class','timer')
    pTime.textContent = object.time;

    div.appendChild(h2);
    div.appendChild(pBlog);
    div.appendChild(buttonEdit);
    div.appendChild(buttonDelete);
    div.appendChild(pTime);

    divShowData.appendChild(div);

 }
 //using map, call a function which create div and more elements to show details on page//
function showData(){
    divShowData.textContent = '';
    blogs.map(function(blog,index){
        createDiv(blog,index);
    });
}
//storing form details and push it into the array of blogs//
function storingData(){
    const headingValue = inputHeading.value;
    inputHeading.value = "";
    const textAreaValue = textArea.value;
    textArea.value = "";
    
    if(headingValue && textAreaValue){
        var today = new Date();
        var date = today.getDate()+'/'+(today.getMonth() + 1)+'/'+today.getFullYear();
        //var time = today.getHours()+':'+today.getMinutes();
        //var fullDate = date +' '+'At'+' '+ time;
        const blog = {};
    blog.heading = headingValue,
    blog.paragraph = textAreaValue,
    blog.time = 'Created At'+':'+date+' '+'At'+' '+ today.toLocaleString('en-us',{hour:'numeric',minute:'numeric', hour12:true}),
    blogs.push(blog);
    }
    else{
        alert('Enter Valid Content.');
    }
    showData();
}
function cancelPost(){
    modal.classList.add('hide');
}
// hide modal when user click on cross symbol//
function hideModal(){
   modal.classList.add('hide');
   inputHeading.value = "";
   textArea.value = "";
}
//showing form when user click on create new post//
function createModal(){
   modal.classList.remove('hide');
}
buttonCancel.addEventListener('click',cancelPost);
span.addEventListener('click',hideModal);
buttonPublish.addEventListener('click',storingData);
createBlogButton.addEventListener('click',createModal);
