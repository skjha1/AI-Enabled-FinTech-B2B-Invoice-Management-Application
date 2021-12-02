'use strict'

const add_button = document.querySelector(".add_button");
const delete_btn = document.querySelector('.delete_btn');
const overlay = document.querySelector('.overlay');
const delete_inv = document.querySelector('.delete_inv');
const add_inv = document.querySelector('.add_inv');
const edit_inv = document.querySelector('.edit_inv');
const edit_btn = document.querySelector('.edit_btn');
const add_save = document.querySelector('#add_save');
const edit_save = document.querySelector('#edit_save');
const delete_btn_2 = document.querySelector('#delete_btn_2');

add_button.addEventListener('click', function ()
{
    add_inv.classList.remove("hidden");
    overlay.classList.remove("hidden");

    document.querySelector('#add_cancel').addEventListener("click", function ()
    {
        add_inv.classList.add("hidden");
        overlay.classList.add("hidden");
    })
    document.querySelector('#add_cross').addEventListener("click", function ()
    {
        add_inv.classList.add("hidden");
        overlay.classList.add("hidden");
    })
    add_save.addEventListener('click',function()
    {

            const name_customer = document.getElementById('name_customer').value;
            const cust_number = (document.getElementById('cust_number').value);
            const invoice_id = (document.getElementById('invoice_id').value);
            const total_open_amount = document.getElementById('total_open_amount').value;
            const due_in_date = document.getElementById('date').value;
            const notes= document.getElementById('notes_data').value;
        
    
    fetch (`http://localhost:8080/Summer_Internship_Backend/add?name_customer=${name_customer}&cust_number=${cust_number}&invoice_id=${invoice_id}&total_open_amount=${total_open_amount}&due_in_date=${due_in_date}&notes=${notes}`,
    {

    method : "POST"
    
    });

    build_json();    
        console.log('Data Added');
        add_inv.classList.add('hidden');
        overlay.classList.add('hidden');
    })


})

function build_json(){
    let data_ab = JSON.parse(get_req("http://localhost:8080/Summer_Internship_Backend/fetch"));
    buildtable(data_ab);
}

// Delete button functionality

delete_btn.addEventListener("click", function ()
{
    console.log("button clicked")
    delete_inv.classList.remove("hidden");
    overlay.classList.remove("hidden");

    document.querySelector('#delete_cancel').addEventListener("click", function ()
    {
        delete_inv.classList.add("hidden");
        overlay.classList.add("hidden");
    })

    document.querySelector('#delete_cross').addEventListener("click", function ()
    {
        delete_inv.classList.add("hidden");
        overlay.classList.add("hidden");
    })
    
        
        delete_btn_2.addEventListener('click',function()
        {
    
        let select_list = check_row_id();
        console.log(select_list);
        for (let i = 0; i < select_list.length; i++)
        {
            let row1=table_data.splice(select_list, 1);
            let invoice_id=row1[0]['invoice_id'];
            console.log(row1);
            fetch(`http://localhost:8080/Summer_Internship_Backend/delete?invoice_id=${invoice_id}`,
            {
                 method:"POST"
            });
            build_json();
        }
            delete_inv.classList.add('hidden');
            overlay.classList.add('hidden');
        });
  
        
})

// edit button functionality

edit_btn.addEventListener("click", function ()
{
    console.log("button clicked")
    edit_inv.classList.remove("hidden");
    overlay.classList.remove("hidden");

    document.querySelector('.close_btn_3').addEventListener("click", function ()
    {
        edit_inv.classList.add("hidden");
        overlay.classList.add("hidden");
    })

    document.querySelector('#edit_cross').addEventListener("click", function ()
    {
        edit_inv.classList.add("hidden");
        overlay.classList.add("hidden");
    })

    edit_save.addEventListener('click',function()
    {
    
        let select_list = check_row_id();
        console.log(select_list);
        if (select_list)
        {
            let total_open_amount= document.querySelector('#total_open_amount_1').value;
            let notes = document.querySelector('#notes').value;
            let row1=table_data.splice(select_list, 1);
            let invoice_id=row1[0]['invoice_id'];
            console.log(total_open_amount,notes,invoice_id);

             fetch(`http://localhost:8080/Summer_Internship_Backend/edit?total_open_amount=${total_open_amount}&notes=${notes}&invoice_id=${invoice_id}`,
            {
                 method:"POST"
            });
            build_json();    
            console.log('Data Added');
        
            edit_inv.classList.add('hidden');
            overlay.classList.add('hidden');
        }
    })


})


// Fetch Row id of the checkbox 

function check_row_id()
{
    var  checkboxes = document.getElementsByName('select');
    let selected= [];
    for(let i=0; i< checkboxes.length;i++)
    {
        if(checkboxes[i].checked)
         
        selected.push(i);
    }
    return selected;
}

function clear_table_data_add()
{
    let table=document.getElementById('add_body');
    table.innerHTML="";
}





function get_req(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

var table_data = JSON.parse(get_req("http://localhost:8080/Summer_Internship_Backend/fetch"));


function buildtable(data)
{
    var table = $('#table_data_1');
    table.empty();
    var max_size = data.length;
    var sta = 1;
    var elements_per_page = 10;
    var limit = elements_per_page;
    goFun(sta, limit);
    function goFun(sta, limit)
    {
        for (var i = sta; i < limit; i++)
        {
            var tab = `<tr id = ${String(i)}>
                            <td><input type="checkbox" class = "checkbox" name="select" onclick = "highlight(${String(i)});"></td>
                            <td>${data[i]["name_customer"]}</td>
                            <td>${data[i]["cust_number"]}</td>
                            <td>${data[i]["invoice_id"]}</td>
                            <td>${data[i]["total_open_amount"]}</td>
                            <td>${data[i]["due_in_date"]}</td>
                            <td>${data[i]["predicted_date"]}</td>
                            <td>${data[i]["notes"]}</td>
                        </tr>`
            
                        $('#table_data_1').append(tab)
        }
    }
    $('#page-right').click(function ()
    {
        var next = limit;
        if (max_size >= next)
        {
            let def = limit + elements_per_page;
            limit = def
            table.empty();
            if (limit > max_size)
            {
                def = max_size;
            }
            goFun(next, def);
        }
    });
    $('#page-left').click(function ()
    {
        var pre = limit - (2 * elements_per_page);
        if (pre >= 0)
        {
            limit = limit - elements_per_page;
            table.empty();
            goFun(pre, limit);
        }
    });
}

buildtable(table_data);








