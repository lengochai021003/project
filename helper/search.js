module.exports=(query)=>{
  let search={
    keyword:"",
  }
  if(query.keyword){
    search.keyword=query.keyword;

    const regex=new RegExp(search.keyword,"i");
    search.regex=regex;
  }
  return search;
}