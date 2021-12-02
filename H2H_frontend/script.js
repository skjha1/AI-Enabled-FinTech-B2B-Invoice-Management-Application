'use strict'

const add_btn = document.querySelector("#add-btn");
const edit_btn = document.querySelector('#edit-btn');
const delete_btn = document.querySelector('#delete-btn');
const overlay = document.querySelector('.overlay');
const edit_form = document.querySelector('.edit-form');
const delete_form = document.querySelector('.delete-form');
const add_form = document.querySelector('.add-form');


add_btn.addEventListener('click', function ()
{
    add_form.classList.remove("hidden");
    overlay.classList.remove("hidden");

    document.querySelector('#add-cancel').addEventListener("click", function ()
    {
        add_form.classList.add("hidden");
        overlay.classList.add("hidden");
    })
    document.querySelector('#add-cross').addEventListener("click", function ()
    {
        add_form.classList.add("hidden");
        overlay.classList.add("hidden");
    })

})

delete_btn.addEventListener("click", function ()
{
    delete_form.classList.remove("hidden");
    overlay.classList.remove("hidden");

    document.querySelector('#delete-cancel').addEventListener("click", function ()
    {
        delete_form.classList.add("hidden");
        overlay.classList.add("hidden");
    })
    document.querySelector('#delete-cross').addEventListener("click", function ()
    {
        delete_form.classList.add("hidden");
        overlay.classList.add("hidden");
    })
})

// edit button functionality

edit_btn.addEventListener("click", function ()
{
    edit_form.classList.remove("hidden");
    overlay.classList.remove("hidden");

    document.querySelector('#edit-cancel').addEventListener("click", function ()
    {
        edit_form.classList.add("hidden");
        overlay.classList.add("hidden");
    });

    document.querySelector('#edit-cross').addEventListener("click", function ()
    {
        edit_form.classList.add("hidden");
        overlay.classList.add("hidden");
    });
});
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




function get_req(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

var table_data = JSON.parse(get_req("http://localhost:8080/H2HBABBA2869/fetch"));


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
                            <td>${data[i]["total_open_amout"]}</td>
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






