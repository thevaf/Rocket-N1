let data = "1:234"

if(data.startsWith("1:")){
    data = data.split("").toString().replace(/1/g, "").replace(/:/g, "").replace(/,/g, "")
    console.log(data)
}