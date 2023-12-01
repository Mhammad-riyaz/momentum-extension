let image 
let author
async function getImage(){
    await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => {
        if(!res.ok){
            throw new Error("something went wrong!")
        }
        return res.json()
    })
    .then(data => {
        console.log(data)
        image = data.urls.full
        author = data.user.name
        let thedata = {user:author,
                        pic:image}
        localStorage.setItem("data",JSON.stringify(thedata))
    })
    .catch(err=>{
        console.log(err)
        image = "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzc3NjA1NTg&ixlib=rb-4.0.3&q=80"
        document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzc3NjA1NTg&ixlib=rb-4.0.3&q=80")`
    })
}

async function displayImage(){
    console.log(JSON.parse(localStorage.getItem("key")))
    if(!JSON.parse(localStorage.getItem("key"))){
        await getImage()
        localStorage.setItem("key","true")
    console.log(JSON.parse(localStorage.getItem("key")))
    }

    let data = localStorage.getItem("data")
    data = JSON.parse(data)
    document.body.style.backgroundImage = `url(${data.pic})`
    document.querySelector(".user-profile").textContent = `By: ${data.user}`
}

function getTime(){
    let date = new Date()
    const theDate = date.toLocaleTimeString('en-US', {timeStyle:"short",hour12: false,})
    document.querySelector("h1").textContent = theDate
}


navigator.geolocation.getCurrentPosition((position)=>{
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
    .then(response=>{
        if(!response.ok){
            throw new Error("something went wrong!")
        }

        return response.json()
    })
    .then((data)=>{
        console.log(data)
        const tempFaren = data.main.temp
        console.log(tempFaren)
        const tempCelcius = (tempFaren - 32) * (5/9)
         document.querySelector(".temp").textContent  = `${Math.round(tempCelcius)} \u00B0C `
        document.querySelector(".icon").innerHTML  = `<img src = https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png>`
        document.querySelector(".city").textContent = data.name
    })
    .catch(err => console.log(err))
})

document.querySelector("form").addEventListener("submit",(e)=>{
    e.preventDefault()
    document.querySelector(".query").style.display = "none"
    const plans = document.querySelector("input").value 
    document.querySelector(".plan-list").innerHTML = `<li> ${plans}</li>`
    document.querySelector("input").value  = ''
    document.querySelector("input").style.display = 'none'
    document.querySelector(".plans").classList.remove("display-none")
})

displayImage()
setInterval(getTime, 1000);
setInterval(()=>{
        localStorage.setItem("key","false")
        displayImage()  
},86400000);
