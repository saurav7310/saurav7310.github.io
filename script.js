let data =[]
let username = document.getElementById('username')
let comment =  document.getElementById('comment')
let item = document.getElementById('cmntCont')

display()
function Add(){
    if(!username.value && !comment.value){
        alert("Please Fill The blank field")
    }
    else{
    let obj ={}
    obj.id=maxID()+1
    obj.username  = username.value;
    obj.comment = comment.value;
    obj.like = 0
    obj.dislike = 0
    console.log(obj)

    data.push(obj)
    username.value=""
    comment.value=""
    update()
    display()
    }
    
}

function maxID(){
     let id 
    if(data.length>0){
        id = data.reduce((acc,current)=> acc>current.id?acc:current.id,0)
    }
    else{
        id=0
    }
    return id

    
}

function update(){
    localStorage.setItem('data',JSON.stringify(data))
}

function like(id){
    // console.log(id)
    for(let i=0;i<data.length;i++){
        if(data[i].id==id){
            data[i].like+=1
        }
    }
    update()
    display()
}
function dislike(id){
    // console.log(id)
    for(let i=0;i<data.length;i++){
        if(data[i].id==id){
            data[i].dislike+=1
        }
    }
    update()
    display()
}

function deleteCom(id){
    data = data.filter((ele)=>ele.id!=id)
    update()
    display()
}

function display(){
    let localData = JSON.parse(localStorage.getItem('data')) ?? []
    item.innerHTML=""
    localData.map(ele=>{
        item.innerHTML +=`
        <div class="cmntSec">
            <h4>${ele.username}</h4>
            <p>${ele.comment}</p>
            <span>${ele.like}</span>
            <button onclick="like(${ele.id})"><i class="fa-solid fa-thumbs-up"></i></button>
            <span>${ele.dislike}</span>
            <button onclick="dislike(${ele.id})"><i class="fa-solid fa-thumbs-down"></i></button>
            <button onclick="deleteCom(${ele.id})"><i class="fa-solid fa-trash"></i></button>
          </div>
        `
    })
}
