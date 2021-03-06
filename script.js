let container = document.getElementsByClassName('container')[0]
let input_template = document.getElementsByClassName('details')[0]
let event_name = document.getElementsByClassName('event_name')[0]
let date_of_event = document.getElementsByClassName('date_of_event')[0]
let time_of_event = document.getElementsByClassName('time_of_event')[0]
let content_on_time_template = document.getElementsByClassName("time_show")[0];
let left_side_floating_date = document.getElementsByClassName('left_side')[0]
let set_new_event = document.getElementById("set");
let sumbit = document.getElementById("sumbit");
let time_section = document.getElementsByClassName('time')[0]
set_new_event.style.display = "none";
// content_on_time_template.style.display="none"
let global;
let hr_sec_bool=true, name_bool=true, date_bool=true;
console.log(content_on_time_template);
//code for upadting data on screen
function timeset(Event_date) {
    let event_date = new Date(Event_date)
    let date = event_date.getDate();
    let arr = (time_of_event.value).split(":")
    event_date.setMinutes(parseInt(arr[1]))
    event_date.setHours(parseInt(arr[0]))
    global = setInterval(() => {
        let taday_date = new Date()
        let days = Math.floor((event_date.getTime() - new Date().getTime()) / 86400000)
        let hours = Math.floor((event_date.getTime() - new Date().getTime()) / 3600000)
        let min = Math.floor((event_date.getTime() - new Date().getTime()) / 60000)
        let sec = Math.floor((event_date.getTime() - new Date().getTime()) / 1000)
        let name = event_name.value
        left_side_floating_date.children[0].children[0].innerText = `${taday_date.getDay()}/${taday_date.getMonth() + 1}/${taday_date.getFullYear()}`
        left_side_floating_date.children[1].children[0].innerText = `${date}/${event_date.getMonth() + 1}/${event_date.getFullYear()}`
        content_on_time_template.children[0].innerHTML = `<span style="display: block;">${name} begins in <br> ${days} Days : ${hours} Hr : ${min} Mins: ${sec} sec</span>`
    }, 1000);



}
// code for feild validation
function input_validity(he_sec_str, name_str, Date_str) {
    let hr_and_sec = /[0-5][0-9]\:[0-5][0-9]/
    let name_validity = /[a-zA-Z 0-9]{5,20}/
    let Date_valitdity1 = /^(((0[13-9]|1[012])[/]?(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[/]?31|02[/]?(0[1-9]|1[0-9]|2[0-8]))[/]?[0-9]{4}|02[/]?29[/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$/
    let text;
    hr_sec_bool=true, name_bool=true, date_bool=true;
    let div = document.createElement("div");
        div.classList.add('alert');
        
    if (!hr_and_sec.test(he_sec_str)){
        text+=" plz fill valid event time"
        hr_sec_bool=false
    }
    if(!name_validity.test(name_str)){
        if(!text==""){
            text+=" and event name(5-20 characters)"
            name_bool=false
        }
        else{
            text+="plz fill valid event name(5-20 characters)"
            name_bool=false
        }
    }
    if(!Date_valitdity1.test(Date_str)){
        if(!text==""){
            text+=" and event date"
            date_bool=false
        }
        else{
            text+="plz fill valid event date"
            date_bool=false
        }
    }
    
    if(!text==""){
        let res = text.replace("undefined", "Alert :");
        div.innerText =res;
        container.insertBefore(div, time_section);
        sumbit.classList.remove(".btn");
        sumbit.style.display = "none";
        setTimeout(() => {
            div.style.display = "none";
            sumbit.classList.add(".btn");
            sumbit.style.display = "block";
        }, 3000);
    }

}

//code for sumbiotn of data thorugh input feild
sumbit.addEventListener('click', () => {
    clearInterval(global);
    if (input_template.value == "" && date_of_event.value == "" && time_of_event.value == "") {
        let div = document.createElement("div");
        div.classList.add('alert');
        div.innerText = "*Please fill all feild";
        container.insertBefore(div, time_section);
        sumbit.classList.remove(".btn");
        sumbit.style.display = "none";
        setTimeout(() => {
            div.style.display = "none";
            sumbit.classList.add(".btn");
            sumbit.style.display = "block";
        }, 2000);

    }
    else {
        input_validity(time_of_event.value,event_name.value,date_of_event.value)
        if(name_bool&&date_bool&&hr_sec_bool){
            diff = new Date(date_of_event.value) - new Date()
            if (diff > 0 && diff <= 31557600000) {
                input_template.style.display = "none"
                set_new_event.style.display = "block"
                sumbit.style.display = "none"
                content_on_time_template.style.display="flex"
                timeset(date_of_event.value);
    
            }
            else {
                let div = document.createElement("div");
                div.classList.add('alert')
                div.innerText = "*Chosse any date within 12 months";
                container.insertBefore(div, time_section);
                sumbit.style.display = "none"
                sumbit.classList.remove(".btn")
                setTimeout(() => {
                    div.style.display = "none"
                    sumbit.style.display = "block"
                    sumbit.classList.add(".btn")
                }, 2000);
            }
        }
        
    }
});
//code for open form to set new data
set_new_event.addEventListener("click", () => {
    input_template.style.display = "flex"
    set_new_event.style.display = "none"
    sumbit.style.display = "block"
    content_on_time_template.style.display = "none"
    event_name.value = date_of_event.value = time_of_event.value = "";
})

