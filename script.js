const icon_plus = document.querySelector(".icons-faq")
const top_icon = document.querySelector(".top-span-faq")
const checkbox = document.querySelector(".faq-input")

icon_plus.onclick = function show_content() {
    checkbox.checked = !checkbox.checked
    console.log(checkbox.checked)
    if(checkbox.checked == true){
        top_icon.style.transform = "rotate(180deg)"
        top_icon.style.transform = "translateY(2px)"
        
    }else{
        top_icon.style.transform = "rotate(90deg)"
    }
}
