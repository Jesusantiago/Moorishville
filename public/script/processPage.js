const processPage = (pageInput) => {
    if(!pageInput) return []
    console.log("processPage")
    const pages = []
    const parts = pageInput.split(',')

    parts.forEach(part => {
        if(part.includes("-")){
            const [ start, end ] = part.split("-").map(Number);
            for(let i = start; i <= end; i++){
                pages.push(i)
            }
        }else {
            pages.push(Number(part))
        }
    });

    return pages
}
  export default processPage