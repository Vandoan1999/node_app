module.exports = function (){
    const date = new Date();
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}-${date.getHours()}h-${date.getMinutes()}'`
}

