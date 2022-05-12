const icon_plus = document.querySelectorAll(".icons-faq")
const top_icon = document.querySelectorAll(".top-span-faq")
const checkbox = document.querySelectorAll(".faq-input")
const hidden_faq = document.querySelectorAll(".faq-p")
for (let i = 0;i < icon_plus.length;i++){
    icon_plus[i].onclick = function show_content() {
        checkbox[i].checked = !checkbox[i].checked
        if(checkbox[i].checked == true){
            top_icon[i].style.transform = "rotate(180deg)"
            top_icon[i].style.transform = "translateY(2px)"
            hidden_faq[i].style.display = "inline"
            hidden_faq[i].style.translate = "translate(150px)"
        }else{
            top_icon[i].style.transform = "rotate(90deg)"
            hidden_faq[i].style.display = "none"
            hidden_faq[i].style.translate = "translate(-150px)"
        }
    }
}

