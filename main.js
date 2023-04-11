// 유저가 input에 입력
// +버튼을 클릭하면 할 일이 추가돔
// delete를 누르면 할 일이 삭제
//check를 누르면 할일이 끝나면서 밑줄
//1. check 버튼 클릭하면 true false 및 밑줄 아니면 그대로

//진행 중 끝남 탭을 누르면, 언더바가 이동
// 끝남은 끝난 아이템만, 진행중은 진행 중만
//전체탭을 보여주면 전체 아이템

  let taskInput = document.getElementById("task-input");
  let addButton = document.getElementById("add-button");
  let taskList = []
  let tabs = document.querySelectorAll(".task-tabs div")
  let mode = "all";
  let filterList = [];
  addButton.addEventListener("click", addTask);

  for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event);
    });
  }

  function addTask(){
    let task = {
      id: randomIDGenerate(),
      taskContent: taskInput.value,
      isComplete: false,
    };
    taskList.push(task);
    console.log(taskList);
    render();
  }

  

  function render(){
    let list = [];
    if(mode==="all"){
      list = taskList;
    }else{
      list = filterList;
    }
    let resultHTML = "";
    for(let i=0; i<list.length;i++){
      if(list[i].isComplete == true){
        resultHTML +=
        `<div class="task">
          <div class="task-done">${list[i].taskContent}</div>
          <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')>Delete</button>
          </div>
        </div>`;
      }
      else{
        resultHTML += 
        `<div class="task">
          <div>${list[i].taskContent}</div>
          <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
          </div>
        </div>`;
      }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
  }
  
  function toggleComplete(id){
    for(let i=0; i<taskList.length; i++){
      if(taskList[i].id ===id){
        taskList[i].isComplete = !taskList[i].isComplete;
        break;
      }
    }
    render();
    console.log(taskList);
  }

  function deleteTask(id){
    for(let i=0; i<taskList.length; i++){
      if(taskList[i].id === id){
        taskList.splice(i,1);
        break;
      }
    }
    render();
    console.log(taskList);
  }

function filter(event){
   mode = event.target.id;
   filterList=[];
     if(mode === "all"){
       render();
     }
     else if(mode==="ongoing"){
       for(let i=0; i<taskList.length;i++){
         if(taskList[i].isComplete == false){
           filterList.push(taskList[i]);
           break;
         }
       }
       render();
    }else if(mode === "done"){
       for(let i=0; i<taskList.length;i++){
         if(taskList[i].isComplete == true){
           filterList.push(taskList[i]);
           break;
         }
       }
       render();
     }
   }

  function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
  }