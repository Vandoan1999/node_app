
$(document).ready(function() {
    loadCssTable_Account()
    clickReset_password_account()
    clickDeleteAccount()
    click_to_delete_product()
    click_to_delete_category()
    click_to_delete_brand()



    //set selected for option category and brand
    const category_name_of_product_updated = $("#select_list_category").attr(
      "data-category-product"
    );
    if (category_name_of_product_updated) {
      $(".option-category").each(function () {
        $(this).text().trim().includes(category_name_of_product_updated.trim())?$(this).attr("selected", "selected"):''
      });
    } 
    
    const brand_name_of_product_updated = $('#select-list-brands').attr("data-brand-product")
    if(brand_name_of_product_updated)
    {
        $('.option-brand').each(function () {
            $(this).text().trim().includes(brand_name_of_product_updated.trim())?$(this).attr("selected", "selected"):''
        })
    }

    //end

    
})

function clickDeleteAccount(){
    // data-id  , class-btn ,  id-class-nhận kq  , id-alert
    $(document).on('click','.btn-delete-password',function(e){
        // e.preventDefault();
        const data = {id:$(this).attr('data-id-password')}
        $.ajax({
            type: 'POST',
            url: '/admin/delete/account',
            dataType: "html",
            data: JSON.stringify(data), 
            contentType: 'application/json',
            beforeSend: function(xhtml){
                xhtml.setRequestHeader("X-HTTP-Method-Override","DELETE");
            },
            success: function(result,status,xhr){
                     $("#home").html(result)
                    loadCssTable_Account()
                    CloseAlert1s('alert-close-1s-tableAccount')
                    changeInfoAlteTo_delete()
                    
            },
            error: function(xhr,status,error){
                console.log(error)
            }
        })
    })
}

function clickReset_password_account(){
    $(document).on('click','.btn-reset-password',function(e){
        
        const data = {id:$(this).attr('data-id-password')}
            $.ajax({
            type: 'POST',
            url: '/admin/resetpassword/account',
            dataType: "html",
            data: JSON.stringify(data), 
            contentType: 'application/json',
            beforeSend: function(xhtml){
                xhtml.setRequestHeader("X-HTTP-Method-Override","PATCH");
            },
            success: function(result,status,xhr){
                     $("#home").html(result)
                    loadCssTable_Account()
                    CloseAlert1s('alert-close-1s-tableAccount')
                 
                    
            },
            error: function(xhr,status,error){
                console.log(error,xhr)
            }
        })
    })  
}

function loadCssTable_Account() {
    $('.row-type').each(function(){
        if($(this).text().includes("admin"))
        {
                $(this).addClass("text-danger")
                $(this).addClass("font-weight-bold")
               $(this).siblings().last().children().addClass('d-none')
        }
    })
  
}

function CloseAlert1s(id_of_html){
    $(`#${id_of_html}`).hide(5000)
    
}
// alert-danger
function changeInfoAlteTo_delete(){
    $('#info-alert-deletep-password').html('<strong class="text-danger">Info!</strong> delete password seeced.');
    $('#alert-close-1s').removeClass('alert-info')
    $('#alert-close-1s').addClass('alert-danger')
}

function click_to_delete_product(){
        $(document).on('click','.btn-delete-product',function(e){
            const data = {id:$(this).attr('data-id-product')}
            $.ajax({
                type: 'POST',
                url: '/admin/product/deleted',
                dataType: "html",
                data: JSON.stringify(data), 
                contentType: 'application/json',
                beforeSend: function(xhtml){
                    xhtml.setRequestHeader("X-HTTP-Method-Override","DELETE");
                },
                success: function(result,status,xhr){
                         $("#listProducts").html(result)
                         CloseAlert1s('alert-close-1s-tableProduct')
                       
                        
                },
                error: function(xhr,status,error){
                    console.log(error)
                }
            })
        })
}


function click_to_delete_category(){
    $(document).on('click','.btn-delete-category', function () {
         const data = {id: $(this).attr('data-id-category')}
         $.ajax({
             type: "POST",
             url: "/admin/delete/category",
             data: JSON.stringify(data),
             dataType: "html",
             contentType: 'application/json',
             beforeSend: function(xhtml){
                 xhtml.setRequestHeader("X-HTTP-Method-Override","DELETE");
             },
             success: function(result,status,xhr){
                     $("#listCategory").html(result)
                     CloseAlert1s('alert-close-1s-tablecategory')
             },
             error: function(xhr,status,error){
                 console.log(error)
             }
            
         });
     });
}

function click_to_delete_brand(){
    $(document).on('click','.btn-delete-brand', function () {
        const data = {id: $(this).attr('data-id-brand')}
        $.ajax({
            type: "POST",
            url: "/admin/brand/deleted",
            data: JSON.stringify(data),
            dataType: "html",
            contentType: 'application/json',
            beforeSend: function(xhtml){
                xhtml.setRequestHeader("X-HTTP-Method-Override","DELETE");
            },
            success: function(result,status,xhr){
                    $("#listBrand").html(result)
                    CloseAlert1s('alert-close-1s-tablebrand')
            },
            error: function(xhr,status,error){
                console.log(error)
            }
           
        });
    });
}



