/*
   setea url
   addUrl recibe Object 
   resetRequest recibe el name de request'request'

*/

export default function useUrl(url) {
  const setRequest = (data) => {
    let request = Object.keys(data).join();
    switch (request) {
      case "find":
        url.page = "";
        url[request] = `&find[name]=${data[request]}`;
        break;
      case "filter":
        url.page = "";
        url[request].push(
          `&filter[${data[request].name}]=${data[request].value}`
        );
        break;
      case "order":
        url.page = "";
        let { name, value } = data[request];
        url[request] = `&order[${name}]=${value}`;
        break;
      case "page":
        url[request] = `&page=${data[request]}`;
        break;
      default:
        data = "";
    }
  };

  const addUrl = (data) => {
    setRequest(data);
    return { ...url };
  };
  const resetRequest = (request) => {
    let defaultValues = {
      find: "",
      filter: [],
      order: "",
      page: "",
    };
    if (defaultValues.hasOwnProperty(request)) {
      return { ...url, [request]: defaultValues[request] };
    }
  };

  return { addUrl, resetRequest };
}
