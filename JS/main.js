// ^ HTML Elements Selectors 
var Site_Name = document.getElementById('bookmark_name');
var Site_Url = document.getElementById('bookmark_url');

var Table_Entery = document.getElementById('table_entery');


//^ Global Array
var bookmark_array = JSON.parse(localStorage.getItem('bookmark')) || []; 
Display_All();
 var name_regex = /^[A-Za-z][a-z]{2,20}?$/;
 var url_regex = /^(http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w-.?%&=]*)?$/; 


//^ functions

function Validate_name(){
    if(name_regex.test(Site_Name.value)){
        Site_Name.classList.add('is-valid')
        Site_Name.classList.remove('is-invalid')
       
    }else{
        Site_Name.classList.add('is-invalid')
        Site_Name.classList.remove('is-valid')
    }

    
}
function Validate_url(){
    if(url_regex.test(Site_Url.value)){
        Site_Url.classList.add('is-valid')
        Site_Url.classList.remove('is-invalid')
        Site_Url.nextElementSibling.classList.add('d-none')
       
    }else{
        Site_Url.classList.add('is-invalid')
        Site_Url.classList.remove('is-valid')
        Site_Url.nextElementSibling.classList.remove('d-none')

    }
}
function Bookmarking(){ 
   
    if(Site_Name.value !== "" && Site_Url.value !== "" ){
        if( name_regex.test(Site_Name.value) && url_regex.test(Site_Url.value)){
            var create_bookmark = { 
                name: Site_Name.value, 
                site: Site_Url.value
            }
        
            bookmark_array.push(create_bookmark);
            localStorage.setItem('bookmark',JSON.stringify(bookmark_array));
          
            Display(bookmark_array.length - 1 ); 
            clear_input(); 
        }
        
    }

   
   }


function clear_input(){ 
    Site_Name.value = ""; 
    Site_Url.value = "" ; 
}
function Display(index){
    var txtlink= bookmark_array[index].site;
    var new_content = `
       
                <tr>
                    <td>${index}</td>
                    <td class=" fw-bold">${bookmark_array[index].name}</td>
                    <td >${bookmark_array[index].site}</td>
                    <td><button class="btn btn-danger" onclick="open_t('${txtlink}')"><i class="fa-solid fa-eye pe-2"></i> Visit</button></td>
                    <td><button class="btn btn-primary" onclick="Del_Book(${index})"><i class="fa-solid fa-trash-can"></i>  Delete</button></td>
                </tr>

`;
console.log(`${bookmark_array[index].site}`)
Table_Entery.innerHTML += new_content; 


}

function open_t(url){ 
    
   
    window.open(url,'_blank');
    
};

function Display_All(){ 
   
    for(count=0; count<bookmark_array.length; count++){
        Display(count);

    }
}


function Del_Book(index){

    bookmark_array.splice(index , 1); 
    localStorage.setItem('bookmark', JSON.stringify(bookmark_array))
    Table_Entery.innerHTML=""
    Display_All(); 
  
}
